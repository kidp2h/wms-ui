import { useGetProjectsQuery } from '@/services/project';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Select,
  SelectProps,
  Table,
  Tag,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Project, TimeEntryProject, TypeProject } from 'wms-types';
import SkeletonTable from '../shared/TableSkeleton';
import {
  useGetTimeEntryEmployeeQuery,
  useUpdateTimeEntryEmployeeMutation,
} from '@/services/timeEntry';
import { orderBy } from 'lodash';

export type InfoDate = {
  day: number;
  month: number;
  year: number;
  object: any;
};
export type RangeType = {
  end: InfoDate;
  start: InfoDate;
};

export const ProjectSchedule = () => {
  const [range, setRange] = useState<RangeType>();

  const [api, contextHolder] = notification.useNotification();
  const [dataSource, setDataSource] = useState<any[]>();
  const [columns, setColumns] = useState<any[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const { data: responseProject, isLoading, refetch } = useGetProjectsQuery();
  const [updateTimeEntryEmployee, { isSuccess }] =
    useUpdateTimeEntryEmployeeMutation();
  const { data: responseTimeEntry, refetch: timeEntryRefetch } =
    useGetTimeEntryEmployeeQuery();
  const [todayEntry, setTodayEntry] = useState<Partial<TimeEntryProject>[]>([]);
  const options: SelectProps['options'] = [
    { value: '0' },
    { value: '4' },
    { value: '8' },
  ];

  const onSelectTimeEntry = (
    value: any,
    timeEntry: TimeEntryProject | null = null,
    projectId?: string,
  ) => {
    if (timeEntry) {
      // INFO: update time entry
      const newEntries = todayEntry.map((entry) => {
        if (entry?.id === timeEntry.id) {
          return {
            ...entry,
            hours: Number(value),
          };
        } else return entry;
      });

      setTodayEntry([...newEntries]);
      setIsChange(true);
    } else {
      //TODO: create time entry
      if (Number(value) !== 0) {
        setIsChange(true);
        setTodayEntry([...todayEntry, { hours: Number(value), projectId }]);
      }
    }
  };
  useEffect(() => {
    if (responseProject !== undefined && responseTimeEntry !== undefined) {
      refetch();
      timeEntryRefetch();

      const listEntries: TimeEntryProject[] = [];
      responseTimeEntry?.data?.forEach((timeEntry) => {
        const dateTimeEntry = dayjs(timeEntry.date).date();
        const monthTimeEntry = dayjs(timeEntry.date).month() + 1;
        const yearTimeEntry = dayjs(timeEntry.date).year();
        if (
          dateTimeEntry === dayjs().date() &&
          monthTimeEntry === dayjs().month() + 1 &&
          yearTimeEntry === dayjs().year()
        ) {
          listEntries.push(timeEntry);
        }
      });

      setTodayEntry([...(listEntries || [])]);
      const _ = orderBy(responseProject?.data, ['type'], ['desc']).map(
        (project: Project) => {
          return {
            key: project.id,
            project: project,
            timeEntry: responseTimeEntry?.data || null,
          };
        },
      );
      setDataSource([..._!]);
    }
  }, [responseProject, responseTimeEntry]);

  const daysOfWeek = [
    'Dự án',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
    'Chủ nhật',
  ];
  useEffect(() => {
    let temp = 0;
    const columns = daysOfWeek.map((value, index) => {
      if (index === 0) {
        return {
          key: 'project',
          title: value,
          dataIndex: 'project',
          render: (project: Project) => {
            if (project.type === TypeProject.LEAVE) {
              return (
                <Tag
                  color='red'
                  className='font-bold uppercase w-full text-center py-2'
                >
                  {project.name}
                </Tag>
              );
            }

            if (project.type === TypeProject.OVERTIME) {
              return (
                <Tag
                  color='warning'
                  className='font-bold uppercase w-full text-center py-2'
                >
                  OT
                </Tag>
              );
            }

            return (
              <Tag
                color='blue'
                className='font-bold uppercase w-full text-center text-sm py-2'
              >
                {project.name}
              </Tag>
            );
          },
        };
      } else {
        const date = range?.start?.object?.add(temp, 'day').date();
        const month = range?.start?.object?.add(temp, 'day').month() + 1;
        const year = range?.start?.object?.add(temp, 'day').year();

        const key = `${index}${date}${month}${year}`;
        const title = `${value} - ${date}/${month}/${year?.toString().slice(2)}`;

        const disabled =
          dayjs().get('date') !== date ||
          dayjs().get('month') + 1 !== month ||
          dayjs().get('year') !== year;

        temp++;
        return {
          key,
          title,
          dataIndex: 'project',
          render: (project: Project, record: any) => {
            const timeEntries = record.timeEntry as TimeEntryProject[];
            let result = null;
            if (project.type === TypeProject.LEAVE && index == 7) {
              return null;
            }
            timeEntries?.some((timeEntry: TimeEntryProject) => {
              const dateTimeEntry = dayjs(timeEntry.date).date();
              const monthTimeEntry = dayjs(timeEntry.date).month() + 1;
              const yearTimeEntry = dayjs(timeEntry.date).year();

              if (
                dateTimeEntry === date &&
                monthTimeEntry === month &&
                yearTimeEntry === year &&
                timeEntry.projectId === project.id
              ) {
                if (disabled) {
                  result = (
                    <Tag
                      className='w-full text-center font-bold block text-sm py-2'
                      color='blue'
                    >
                      {timeEntry.hours}
                    </Tag>
                  );
                } else {
                  result = (
                    <Select
                      disabled={disabled}
                      options={options}
                      size='large'
                      className='w-full text-center'
                      onChange={(value) => onSelectTimeEntry(value, timeEntry)}
                      variant='borderless'
                      suffixIcon={null}
                      labelRender={(label) => (
                        <Tag
                          className='w-full text-sm font-bold py-2 text-center'
                          color='green'
                        >
                          {label.value}
                        </Tag>
                      )}
                      optionRender={(option) => {
                        return (
                          <Tag
                            className='w-full py-2 text-center font-bold '
                            color='green'
                          >
                            {option.value}
                          </Tag>
                        );
                      }}
                      defaultValue={{ value: timeEntry.hours }}
                    />
                  );
                }
                return true;
              } else {
                if (disabled) {
                  result = (
                    <Tag
                      className='w-full text-center font-bold block text-sm py-2'
                      color='red'
                    >
                      0
                    </Tag>
                  );
                } else {
                  result = (
                    <Select
                      disabled={disabled}
                      options={options}
                      size='large'
                      className='w-full text-center'
                      variant='borderless'
                      onChange={(value) =>
                        onSelectTimeEntry(value, null, project.id)
                      }
                      suffixIcon={null}
                      labelRender={(label) => (
                        <Tag
                          className='w-full  text-sm font-bold py-2 text-center'
                          color='green'
                        >
                          {label.value}
                        </Tag>
                      )}
                      optionRender={(option) => {
                        return (
                          <Tag
                            className='w-full py-2 text-center font-bold text-sm'
                            color='green'
                          >
                            {option.value}
                          </Tag>
                        );
                      }}
                      defaultValue={{ value: 0 }}
                      defaultActiveFirstOption={true}
                    />
                  );
                }
              }
            });

            if (result === null) {
              result = (
                <Select
                  disabled={disabled}
                  options={options}
                  size='large'
                  className='w-full text-center'
                  variant='borderless'
                  onChange={(value) =>
                    onSelectTimeEntry(value, null, project.id)
                  }
                  suffixIcon={null}
                  labelRender={(label) => (
                    <Tag
                      className='w-full  text-sm font-bold py-2 text-center'
                      color={`${disabled ? 'red' : 'green'}`}
                    >
                      {label.value}
                    </Tag>
                  )}
                  optionRender={(option) => {
                    return (
                      <Tag
                        className='w-full py-2 text-center font-bold text-sm'
                        color='green'
                      >
                        {option.value}
                      </Tag>
                    );
                  }}
                  defaultValue={{ value: 0 }}
                  defaultActiveFirstOption={true}
                />
              );
            }
            return result;
          },
        };
      }
    });
    setColumns(columns);
  }, [range, todayEntry]);

  const onChange: DatePickerProps['onChange'] = (date) => {
    const startOfWeek = date.day(0).add(1, 'day');

    const endOfWeek = startOfWeek.add(7, 'day');

    setRange({
      start: {
        day: startOfWeek.get('D'),
        object: startOfWeek,
        month: startOfWeek.month(),
        year: startOfWeek.year(),
      },
      end: {
        day: endOfWeek.get('D'),
        month: endOfWeek.month(),
        object: endOfWeek,
        year: endOfWeek.year(),
      },
    });
  };

  const saveSchedule = () => {
    if (isChange && todayEntry.length > 0) {
      updateTimeEntryEmployee(todayEntry);
      setIsChange(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      api.success({
        message: 'Thông báo',
        description: 'Lưu thành công',
      });
    }
  }, [isSuccess]);

  return (
    <Flex className='flex-col'>
      {contextHolder}
      <DatePicker
        showNow={false}
        className='mb-5 w-72'
        type='week'
        picker='week'
        onChange={onChange}
        allowClear={false}
      />

      {range && (
        <>
          <SkeletonTable loading={isLoading} columns={columns as any}>
            <Table
              className='w-full'
              dataSource={dataSource}
              columns={columns}
              title={() => 'Bảng chấm công'}
              pagination={false}
            ></Table>
          </SkeletonTable>

          <Button
            className='mt-5 w-20 ml-auto'
            onClick={saveSchedule}
            type='primary'
          >
            Lưu
          </Button>
        </>
      )}
    </Flex>
  );
};