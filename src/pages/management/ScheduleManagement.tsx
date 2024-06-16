import { ProjectSchedule } from '@/components/dashboard/ProjectSchedule';
import { useGetEmployeesQuery } from '@/services';
import { Flex, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';

export const ScheduleManagement = () => {
  const {
    data: responseEmployees,
    isLoading,
    refetch,
  } = useGetEmployeesQuery();
  const [tab, setTab] = useState<string | null>(null);
  const [tabs, setTabs] = useState<TabsProps['items']>([
    {
      key: '1',
      label: 'Chấm công',
      children: <ProjectSchedule employeeId={null} isAdmin />,
    },
  ]);

  useEffect(() => {
    if (responseEmployees != undefined && responseEmployees.data) {
      const employees = responseEmployees.data;
      setTabs(
        employees.map((employee) => {
          return {
            key: employee.id,
            label: employee.fullname,
            children: <ProjectSchedule employeeId={employee.id} isAdmin />,
          };
        }),
      );
      setTab(employees[0].id);
    }
  }, [responseEmployees]);

  return (
    <>
      <Flex>
        <Tabs
          type='card'
          className='w-full'
          accessKey={tab || ''}
          items={tabs}
          onChange={(key) => {
            setTab(key);
          }}
          destroyInactiveTabPane={false}
        />
      </Flex>
    </>
  );
};
