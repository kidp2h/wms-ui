import { ProjectSchedule } from '@/components/schedules/ProjectSchedule';
import { Flex, Tabs, TabsProps } from 'antd';

export const EmployeeSchedule = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Chấm công',
      children: <ProjectSchedule employeeId={null} isAdmin={false} />,
    },
  ];
  const onChange = () => {};
  return (
    <>
      <Flex>
        <Tabs
          type='card'
          className='w-full'
          defaultActiveKey='1'
          items={items}
          onChange={onChange}
        />
      </Flex>
    </>
  );
};
