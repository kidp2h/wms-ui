import { ProjectSchedule } from '@/components/dashboard/ProjectSchedule';
import { Flex, Tabs, TabsProps } from 'antd';

export const Dashboard = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Chấm công',
      children: <ProjectSchedule />,
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
