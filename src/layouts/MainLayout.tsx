import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';

export default function MainLayout() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
