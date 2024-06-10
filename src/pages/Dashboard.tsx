import { ProjectCalendar } from "@/components/dashboard/ProjectCalendar";
import { Flex, Tabs, TabsProps } from "antd";

export const Dashboard = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Project 1',
      children: "sdsd",
    },

    {
      key: '2',
      label: 'Project 2',
      children: (<ProjectCalendar code='2' />),
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return <>
    <Flex>
      <Tabs type="card" defaultActiveKey="2" items={items} onChange={onChange} />
    </Flex>
  </>;
};
