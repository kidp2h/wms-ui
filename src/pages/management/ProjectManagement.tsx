import { Card, Flex,Button,Segmented,Table ,TableColumnsType, Input, Space  } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { AudioOutlined } from '@ant-design/icons';
import type { FlexProps, SegmentedProps } from 'antd';
const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 50,
  borderRadius: 6,
};
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
interface Project{
  id: string;
  code: string;
  name: string;
  description: string;
  status: boolean;
  type: string;
  typeLeave: string;
  limit: number;
  startAt:Date
  updateAt:Date
}
const columns: TableColumnsType<Project> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'TypeLeave',
    dataIndex: 'typeLeave',
  },
  {
    title: 'Limit',
    dataIndex: 'limit',
  },
  { title: 'StartAt', dataIndex: 'startAt' },
  { title: 'UpdateAt', dataIndex: 'updateAt' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
  
];
const data: Project[] = [
  {
    id: '1',
    code: '1',
    name: '2sad',
    description: '2dsad',
    status: false,
    type: '1',
    typeLeave: 'sadasd',
    limit: 1,
    startAt: new Date(),
    updateAt: new Date(),
  },
];

export const ProjectManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <Card title="Bảng Dự án " extra={<a href="#">Add More</a>} style={{ width: '100%',height:'100%' }}>
      <Flex vertical= 'vertical'>
         <Flex style={boxStyle} justify="flex-start" align="flex-start">
         <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 }} />

        </Flex> 

        <div style={{ width: '100%',height:'200px' }}>
      <Table  style={{ width: '100%',height:'100%' }}   rowSelection={rowSelection} columns={columns} dataSource={data} />

      </div>

      </Flex>



    </Card>

  );
};
