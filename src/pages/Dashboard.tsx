import { Flex, Tabs, TabsProps } from 'antd';
import { Statistics } from './Statistics';

export const Dashboard = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thống kê',
      children: <Statistics />,
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
