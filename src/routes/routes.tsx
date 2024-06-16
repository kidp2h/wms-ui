import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import { config } from './routes.config';
import AuthLayout from '@/layouts/AuthLayout';
import {
  Logout,
  EmployeeManagement,
  NotFound,
  ProjectManagement,
  Dashboard,
  Profile,
} from '@/pages';

export const RoutesConfig = () => {
  return (
    <Routes>
      <Route path={config.logout} element={<Logout />}></Route>
      <Route path={config.dashboard.root} Component={MainLayout}>
        <Route path={config.dashboard.profile} element={<Profile />} />
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
      <Route path='/auth' Component={AuthLayout}>
        <Route index path='/auth/login' element={<Login />} />
      </Route>

      <Route path='*' Component={NotFound} />
    </Routes>
  );
};
