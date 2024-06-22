import { ProjectSchedule } from '@/components/dashboard/ProjectSchedule';
import { Flex, Tabs, TabsProps } from 'antd';
import { Satistics } from './Statistics';

export const Dashboard = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: ' Trang Chủ',
      children: <Satistics />,
    },
    {
      key: '2',
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
