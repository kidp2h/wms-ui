import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';

export default function AuthLayout() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
