import {
  useAddProjectMutation,
  useGetProjectsQuery,
  useRemoveProjectMutation,
  useGetProjectsbySreachQuery,
  useGetProjectByIdQuery
} from '@/services/project';
import { Card, Flex, Table, Input, Space, Button, Form, Tooltip } from 'antd';
import { random } from 'lodash';
import { useEffect, useState } from 'react';
import { Project, StatusProject, TypeProject, TypeLeave, Role } from 'wms-types';
const { Search } = Input;
import { SearchProps } from 'antd/es/input';
import { ColumnType } from 'antd/es/table';
import { ColumnExpand, EditableCell } from '@/components/shared/EditableCell';

import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import SkeletonTable, { SkeletonTableColumnsType } from '@/components/shared/TableSkeleton';
import { useSelector } from 'react-redux';
import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import { useGetEmployeeByCodeQuery } from '@/services';
import { useNavigate } from 'react-router-dom';
export const ProjectManagement = () => {
  const code = useSelector(selectCurrentCode);
  const { data: currentuser  } = useGetEmployeeByCodeQuery(code || '');
  const { data: response, isError, isLoading, currentData } = useGetProjectsQuery();
  const [removeProject, ProjectRemoved] = useRemoveProjectMutation();
  const [addProject, ProjectAdded] = useAddProjectMutation();
  const [Projects, setProjects] = useState<Partial<Project>[]>([]);
  const [creatingKey, setCreatingKey] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { data: project1 } = useGetProjectsbySreachQuery(search)

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: Partial<Project>) => record.code === editingKey;
  const edit = (record: Partial<Project>) => {
    console.log({ ...record });
    form.setFieldsValue({ ...record });
    setEditingKey(record.code!);
  };
  const save = async (record: Partial<Project>) => {
    setEditingKey('');
    const row = await form.validateFields();
    console.log(row);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if((currentuser?.data.role == Role.EMPLOYEE)){
      navigate('/');
    }
    if (response != undefined) {
      setProjects([...response?.data!]);
    }
  }, [response]);
  const cancel = () => {
    setEditingKey('');
  };
  const remove = (record: Partial<Project>) => {
    setCreatingKey('');
    setProjects(Projects.filter((e) => e.code !== record.code));
    if (record.id) removeProject(record.id);
  };
  const add = () => {
    const code = `P${random(100000000, 999999999)}`;
    const newProject = { fullname: '', code: code, password: '', email: '' };
    form.setFieldsValue({ ...newProject });
    setCreatingKey(code);
    setEditingKey(code);
    setProjects([newProject, ...Projects]);
  };
  const del = (record: Partial<Project>) => {
    setCreatingKey('');
    setEditingKey('');
    setProjects(Projects.filter((e) => e.code !== record.code));
  };
  const applyAdd = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Required<Project>
      const { name, description, status, type, typeLeave, limit } = row;
      const projectadd = {
        code: editingKey,
        name,
        description,
        status,
        type,
        typeLeave,
        limit,

      }
      const result = await addProject(projectadd)

      setProjects(Projects.map((e) => e.code === editingKey ? { ...projectadd, id: result.data?.data?.id } : e))
      setCreatingKey('')
      setEditingKey('')
      console.log(projectadd)

      const result = await addProject(project);

      setProjects(
        Projects.map((e) =>
          e.code === editingKey ? { ...project, id: result.data?.data?.id } : e,
        ),
      );
      setCreatingKey('');
      setEditingKey('');
    } catch (error) {
      console.log(error);
    }
  }
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (!value ) {
      setProjects([...response?.data!])
    }
     else {
      setSearch(value)
      if (project1 != undefined) {
        console.log(project1?.data)
        setProjects([...project1?.data!])
      }
    }
  }
  const columns: (ColumnType<Partial<Project>> & ColumnExpand)[] = [
    {
      title: 'Mã dự án',
      dataIndex: 'code',
      editable: false,
    },
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Mô tả dự án',
      dataIndex: 'description',
      editable: true,
      type: 'string',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      editable: true,
      type: 'select',
      values: [StatusProject.COMPLETED, StatusProject.NOT_STARTED, StatusProject.ONGOING]
    },
    {
      title: 'Loại dự án',
      dataIndex: 'type',
      editable: true,
      type: 'select',
      values: [TypeProject.LEAVE, TypeProject.OVERTIME, TypeProject.PROJECT]
    },
    {
      title: 'Loại nghỉ',
      dataIndex: 'typeLeave',
      editable: true,
      type: 'select',

      values: [TypeLeave.ANNUAL, TypeLeave.CLASS_SCHEDULE, TypeLeave.INTERN, TypeLeave.SICK, TypeLeave.VACATION]
    },
    {
      title: 'Giới hạn Thành viên',
      dataIndex: 'limit',
      editable: true,
      type: 'number'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Partial<Project>) => {
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
      onCell: (record: Partial<Project>) => ({
        record,
        title: col.title,
        dataindex: col.dataIndex,
        editing: isEditing(record) ? true : false,
        type: col.type || 'string',
        values: col?.values || null,
      }),
    };
  });
  return (
    <Card title='Bảng Dự Án' className='h-full'>
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
          <SkeletonTable loading={isLoading}  columns={mappedColumn as SkeletonTableColumnsType[]}>
            <Form form={form} component={false}>
              <Table
                className='h-full w-full'
                rowKey={'code'}
                columns={mappedColumn}
                dataSource={Projects}
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
