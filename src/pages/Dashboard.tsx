import { Flex, Tabs, TabsProps } from 'antd';
import { Statistics } from './Statistics';

export const Dashboard = () => {
  return (
    <>
      <div className='text-2xl uppercase bold mb-5'>Thống kê</div>
      <Statistics />
    </>
  );
};
