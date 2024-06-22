import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { Avatar, Button, Layout, Menu, MenuProps, theme } from 'antd';
import { useSelector } from 'react-redux';
import {
  selectCurrentCode,
  selectCurrentUser,
} from '@/redux/features/auth/auth.slice';
import { useEffect, useState } from 'react';

import {
  CalendarOutlined,
  DashboardOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { config } from '@/routes';
import { useGetEmployeeByCodeQuery } from '@/services';
import { Role } from 'wms-types';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
  const code = useSelector(selectCurrentCode);
  const [currentcode, setcurrentcode] = useState<string>('');
  const { data: response, isLoading } = useGetEmployeeByCodeQuery(code || '');

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);
  console.log(location);

  const headerItem: MenuProps['items'] = [
    {
      key: 'headerName',
      label: 'Workforce Management System',
      className: 'mr-auto',
    },
    {
      className: 'ml-auto',
      key: 'fullnameHeaderItem',
      label: (
        <Avatar
          size='large'
          style={{ backgroundColor: 'grey' }}
          icon={<UserOutlined />}
        />
      ),
      children: [
        {
          key: config.system.employee.profile.path,
          label: (
            <Link to={config.system.employee.profile.path}>
              Cài đặt thông tin
            </Link>
          ),
        },
        {
          key: 'logout',
          label: <Link to={config.logout}>Đăng xuất</Link>,
        },
      ],
    },
  ];
  const siderItemsForAdmin: MenuProps['items'] = [
    {
      key: config.system.management.root.key,
      label: 'Quản lý',
      icon: <LaptopOutlined />,
      children: [
        {
          key: config.system.management.project.path,
          label: <Link to={config.system.management.project.path}>Dự án</Link>,
          icon: <ProjectOutlined />,
        },
        {
          key: config.system.management.employee.path,
          label: (
            <Link to={config.system.management.employee.path}>Nhân viên</Link>
          ),
          icon: <UsergroupAddOutlined />,
        },

        {
          key: config.system.management.schedule.path,
          label: (
            <Link to={config.system.management.schedule.path}>Điểm danh</Link>
          ),
          icon: <CalendarOutlined />,
        },
      ],
    },
  ];
  const siderItemsForEmployee: MenuProps['items'] = [
    {
      key: config.system.dashboard.path,
      label: <Link to={config.system.dashboard.path}>Dashboard </Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: config.system.employee.schedule.path,
      label: <Link to={config.system.employee.schedule.path}>Chấm công </Link>,
      icon: <CalendarOutlined />,
    },
  ];
  const siderItems =
    response?.data?.role === Role.MANAGER
      ? [...siderItemsForEmployee, ...siderItemsForAdmin]
      : siderItemsForEmployee;

  return (
    user && (
      <BaseLayout>
        <Header
          style={{
            display: 'flex',
          }}
        >
          <Menu
            theme='dark'
            className='flex w-full'
            mode='horizontal'
            selectable={false}
            items={headerItem}
            style={{ width: '100%' }}
          />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
              overflow: 'auto',
            }}
            breakpoint='xs'
            collapsedWidth='50'
          >
            <Menu
              mode='inline'
              defaultSelectedKeys={[location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
              items={siderItems}
            />
          </Sider>
          <Layout className='p-6'>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </BaseLayout>
    )
  );
}
