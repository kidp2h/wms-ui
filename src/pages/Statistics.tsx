import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import {
  useGetEmployeeByCodeQuery,
  useGetProjectByEmployeeQuery,
  useGetTimeEntryEmployeeQuery,
} from '@/services';
import { Card, Flex, Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const options: SelectProps['options'] = [];
const Daynow = new Date();
for (let i = Daynow.getFullYear() - 20; i <= Daynow.getFullYear(); i++) {
  options.push({
    value: i.toString(),
    label: i.toString(),
  });
}
export const Statistics = () => {
  const code = useSelector(selectCurrentCode);
  const [date, setDate] = useState<number>(Daynow.getFullYear());
  const { data: currentuser } = useGetEmployeeByCodeQuery(code || '');
  const { data: projectsemployee } = useGetProjectByEmployeeQuery({
    id: currentuser?.data?.id || '',
    year: date,
  });
  const { data: response } = useGetTimeEntryEmployeeQuery(
    currentuser?.data?.id || '',
  );
  const [totalProject, setTotalProject] = useState<string>('0');
  const [totalTimeEntry, setTotalTimeEntry] = useState<string>('0');
  const [Leaveday, setLeaveday] = useState<string>('0');
  useEffect(() => {
    const currentProjects: string[] = [];
    if (response?.data === undefined) return;
    const datas =
      response?.data?.filter(
        (x) => parseInt(x.date.toString().split('-')[0]) == date,
      ) || [];
    setTotalTimeEntry(
      datas.reduce((acc, current) => acc + current.hours, 0).toString() || '0',
    );
    datas.forEach((x) => {
      if (!currentProjects.includes(x.projectId)) {
        currentProjects.push(x.projectId);
      }
    });

    setTotalProject(currentProjects.length.toString());
    setLeaveday(
      projectsemployee?.data
        .reduce((acc, current) => acc + current.limit, 0)
        .toString() || '0',
    );
  }, [date]);
  const handleChange = (value: string) => {
    setDate(parseInt(value));
    console.log(date);
  };

  return (
    <>
      <Select
        showSearch
        placeholder='Select a year'
        onChange={handleChange}
        options={options}
        style={{ width: 150, marginBottom: '20px' }}
        defaultValue={Daynow.getFullYear().toString()}
      />

      <Flex justify={'flex-start'} align={'center'} style={{ gap: '16px' }}>
        <Card
          title='Tổng Dự án tham gia'
          bordered={false}
          style={{ width: 300 }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{totalProject}</span>
            <span className='ml-1 mt-4'> /dự án</span>
          </Flex>
        </Card>
        <Card
          title='Tổng giờ công của dự án'
          bordered={false}
          style={{ width: 300 }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{totalTimeEntry}</span>
            <span className='ml-1 mt-4'> /h</span>
          </Flex>
        </Card>
        <Card
          title='Tổng ngày được nghỉ '
          bordered={false}
          style={{ width: 300 }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{Leaveday}</span>
            <span className='ml-1 mt-4'> /ngày</span>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
