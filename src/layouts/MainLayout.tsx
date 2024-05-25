import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { Layout } from 'antd';

export default function MainLayout() {
  return (
    <BaseLayout>
      <Layout.Header />
      <Outlet />
    </BaseLayout>
  );
}
