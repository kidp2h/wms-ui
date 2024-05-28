import { Route, RouteProps, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import MainLayout from '@/layouts/MainLayout';
import { config } from './routes.config';
import ProjectManagement from '@/pages/management/ProjectManagement';
import NotFound from '@/pages/NotFound';
import EmployeeManagement from '@/pages/management/EmployeeManagement';
import AuthLayout from '@/layouts/AuthLayout';
import { selectCurrentUser } from '@/redux/features/auth/auth.slice';
import { useSelector } from 'react-redux';

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path={config.dashboard.root} Component={MainLayout}>
        <Route index element={<Dashboard />} />
        <Route path={config.dashboard.management.root.path}>
          <Route
            path={config.dashboard.management.project.path}
            element={<ProjectManagement />}
          />

          <Route
            path={config.dashboard.management.employee.path}
            element={<EmployeeManagement />}
          />
        </Route>
      </Route>
      <Route path='/auth' Component={AuthLayout}>
        <Route index path='/auth/login' element={<Login />} />
      </Route>

      <Route path='*' Component={NotFound} />
    </Routes>
  );
};
