import { Card, Flex,Button,Segmented,Table ,TableColumnsType, Input, Space  } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { AudioOutlined } from '@ant-design/icons';
import type { FlexProps, SegmentedProps } from 'antd';

import React, { useState } from 'react';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 50,
  borderRadius: 6,
};
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface Employee {
  id: string;
  code: string;
  email: number;
  password: string;
  fullname: string;
  role: string;
}
const columns: TableColumnsType<Employee> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Fullname',
    dataIndex: 'fullname',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
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
const data: Employee[] = [
  {
    id: '1',
    code: 'NV001',
    email: 123456,
    password: '123456',
    fullname: 'Nguyen Van A',
    role: 'Admin',
  }
];

export const EmployeeManagement = () => {
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
    <Card title="Bảng Nhân viên " extra={<a href="#">Add More</a>} style={{ width: '100%',height:'100%' }}>
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
