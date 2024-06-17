import { Employee,Role } from 'wms-types';
import { Card, Flex, Table, Input, Space, Button, Form, Tooltip } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useEffect, useState } from 'react';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { ColumnExpand, EditableCell } from '@/components/shared/EditableCell';
import { ColumnType } from 'antd/es/table';
import {
  useAddEmployeeMutation,
  useGetEmployeeByCodeQuery,
  useGetEmployeesQuery,
  useRemoveEmployeeMutation,
} from '@/services';
import SkeletonTable, {
  SkeletonTableColumnsType,
} from '@/components/shared/TableSkeleton';
import { random } from 'lodash';
import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

export const EmployeeManagement = () => {
 
  const { data: response, isLoading } = useGetEmployeesQuery();
  const [removeEmployee, employeeRemoved] = useRemoveEmployeeMutation();
  const [addEmployee, employeeAdded] = useAddEmployeeMutation();
  const [employees, setEmployees] = useState<Partial<Employee>[]>([]);
  const [creatingKey, setCreatingKey] = useState<string>('')
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: Partial<Employee>) => record.code === editingKey;
  const edit = (record: Partial<Employee>) => {
    console.log({ ...record });

    form.setFieldsValue({ ...record });
    setEditingKey(record.code!);
  };

  const save = async (record: Partial<Employee>) => {
    setEditingKey('');
    const row = await form.validateFields();
    console.log(row);
  };
  useEffect(() => {
 
    if (response != undefined && response.data) {
      setEmployees([...response?.data!]);
    }
  }, [response]);

  const cancel = () => {
    setEditingKey('');
  };

  const remove = (record: Partial<Employee>) => {

    setCreatingKey('');
    setEmployees(employees.filter((e) => e.code !== record.code));
    if (record.id) removeEmployee(record.id);
  };
  const add = () => {
    const code = `E${random(100000000, 999999999)}`;
    const newEmployee = { fullname: '', code: code, password: '', email: '' };
    form.setFieldsValue({ ...newEmployee });

    setCreatingKey(code);
    setEditingKey(code);
    setEmployees([newEmployee, ...employees]);
  };

  const del = (record: Partial<Employee>) => {
    setCreatingKey('');
    setEditingKey('');
    setEmployees(employees.filter((e) => e.code !== record.code));
  };

  const applyAdd = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Required<Employee>;
      const { role, fullname, password, email } = row;
      const employee = {
        code: editingKey,
        role,
        email,
        fullname,
        password,
      };

      const result = await addEmployee(employee);

      setEmployees(
        employees.map((e) =>
          e.code === editingKey
            ? { ...employee, id: result.data?.data?.id }
            : e,
        ),
      );
      setCreatingKey('');
      setEditingKey('');
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);
  const columns: (ColumnType<Partial<Employee>> & ColumnExpand)[] = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'code',
      editable: false,
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      editable: true,
      render: () => {
        return '****';
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
      type: 'string',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      editable: true,
      type: 'string',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      editable: true,
      type: 'select',
      values: [Role.EMPLOYEE, Role.MANAGER],
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Partial<Employee>) => {
        // console.log(record);

        const editable = isEditing(record);
        if (record?.id === undefined) {
          return (
            <Space>
              <Tooltip placement='topLeft' title={'Thêm'}>
                <Button
                  type='primary'
                  shape='round'
                  className='h-10 w-10 flex items-center justify-center'
                  onClick={() => {
                    applyAdd(record.code!);
                  }}
                >
                  <CheckOutlined />
                </Button>
              </Tooltip>

              <Tooltip placement='topLeft' title={'Xóa'}>
                <Button
                  danger
                  type='primary'
                  shape='round'
                  onClick={() => {
                    del(record);
                  }}
                  className='h-10 w-10 flex items-center justify-center'
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Space>
          );
        }
        return !editable ? (
          <Space>
            <Tooltip placement='topLeft' title={'Chỉnh sửa'}>
              <Button
                type='primary'
                shape='round'
                disabled={editingKey != ''}
                className='h-10 w-10 flex items-center justify-center'
                onClick={() => {
                  edit(record);
                }}
              >
                <EditOutlined />
              </Button>
            </Tooltip>

            <Tooltip placement='topLeft' title={'Xóa'}>
              <Button
                danger
                type='primary'
                shape='round'
                onClick={() => remove(record)}
                className='h-10 w-10 flex items-center justify-center'
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        ) : (
          <Space>
            <Tooltip placement='topLeft' title={'Lưu'}>
              <Button
                type='primary'
                shape='round'
                className='h-10 w-10 flex items-center justify-center'
                onClick={() => save(record)}
              >
                <SaveOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement='topLeft' title={'Hủy'}>
              <Button
                danger
                type='primary'
                shape='round'
                onClick={cancel}
                className='h-10 w-10 flex items-center justify-center'
              >
                <StopOutlined />
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const mappedColumn: any = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Partial<Employee>) => ({
        record,
        title: col.title,
        dataindex: col.dataIndex,
        editing: isEditing(record) ? true : false,
        type: col.type || 'string',
        values: col?.values || null,
      }),
    };
  });
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  return (
    <Card title='Bảng Nhân viên' className='h-full'>
      <Flex vertical>
        <Flex className='justify-between items-start w-full h-12'>
          <Search
            placeholder='input search text'
            allowClear
            onSearch={onSearch}
            className='h-72 w-fit'
          />
          <Button
            onClick={add}
            disabled={creatingKey != ''}
            type='primary'
            shape='round'
            className='w-10 h-10 flex items-center justify-center'
          >
            <PlusOutlined />
          </Button>
        </Flex>
        <div className='w-full h-full'>
          <SkeletonTable
            loading={isLoading}
            columns={mappedColumn as SkeletonTableColumnsType[]}
          >
            <Form form={form} component={false}>
              <Table
                className='h-full w-full'
                rowKey={'code'}
                columns={mappedColumn}
                dataSource={employees}
                pagination={false}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
              />
            </Form>
          </SkeletonTable>
        </div>
      </Flex>
    </Card>
  );
};
