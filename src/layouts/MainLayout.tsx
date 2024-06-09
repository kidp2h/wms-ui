import { useNavigate, Outlet, Link } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { Avatar, Button, Layout, Menu, MenuProps, theme } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/auth.slice';
import { useEffect, useState } from 'react';
import {
  DashboardOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { config } from '@/routes';

const { Header, Sider, Content } = Layout;
export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);
  const headerItem: MenuProps['items'] = [
    { key: 'headerName', label: 'Workforce Management System' },
    {
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
          key: 'profile',
          label: <Link to={config.dashboard.profile}>Cài đặt thông tin</Link>,
        },
        {
          key: 'logout',
          label: <Link to={config.logout}>Đăng xuất</Link>,
        },
      ],
    },
  ];
  const siderItems: MenuProps['items'] = [
    {
      key: 'employeeSiderItem',
      label: <Link to={config.dashboard.root}>Dự án</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: 'managerSiderItem',
      label: 'Quản lý',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'manager_projectSiderItem',
          label: (
            <Link to={config.dashboard.management.project.path}>Dự án</Link>
          ),
          icon: <ProjectOutlined />,
        },
        {
          key: 'manager_employeeSiderItem',
          label: (
            <Link to={config.dashboard.management.employee.path}>
              Nhân viên
            </Link>
          ),
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
  ];
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
            className='flex w-full justify-between'
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={siderItems}
            />
          </Sider>
          <Layout className='p-10'>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </BaseLayout>
    )
  );
}
