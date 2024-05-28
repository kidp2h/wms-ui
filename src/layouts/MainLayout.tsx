import { useNavigate, Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/auth.slice';
import { useEffect } from 'react';

const { Header } = Layout;
export default function MainLayout() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user]);
  return (
    user && (
      <BaseLayout>
        <Header />
        <Outlet />
      </BaseLayout>
    )
  );
}
