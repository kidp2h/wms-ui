import { ProjectSchedule } from '@/components/schedules/ProjectSchedule';
import { useGetEmployeesQuery } from '@/services';
import { Flex, Select, Tabs, TabsProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Employee } from 'wms-types';

export const ScheduleManagement = () => {
  const {
    data: responseEmployees,
    isLoading,
    refetch,
  } = useGetEmployeesQuery();
  const [current, setCurrent] = useState<string | null>(null);

  const [tabs, setTabs] = useState<TabsProps['items']>([
    {
      key: '1',
      label: 'Chấm công',
      children: <ProjectSchedule employeeId={null} isAdmin />,
    },
  ]);
  const [employees, setEmployees] = useState<Partial<Employee>[]>([]);

  useEffect(() => {
    if (responseEmployees != undefined && responseEmployees.data) {
      const employees = responseEmployees.data;
      setEmployees([...employees]);
    }
  }, [responseEmployees]);

  return (
    <>
      <Flex className='flex-col'>
        {/* <Tabs */}
        {/*   type='card' */}
        {/*   className='w-full' */}
        {/*   accessKey={tab || ''} */}
        {/*   items={tabs} */}
        {/*   onChange={(key) => { */}
        {/*     setTab(key); */}
        {/*   }} */}
        {/*   destroyInactiveTabPane={false} */}
        {/* /> */}
        <Select
          showSearch
          placeholder='Chọn nhân viên'
          className='w-1/5 block mb-5'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => {
            console.log(value);
            setCurrent(value);
          }}
          options={employees.map((employee) => {
            return {
              value: employee.id,
              label: employee.fullname,
            };
          })}
          defaultActiveFirstOption={true}
        />
        <>{current && <ProjectSchedule employeeId={current} isAdmin />}</>
      </Flex>
    </>
  );
};
