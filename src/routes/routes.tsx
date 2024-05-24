import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import MainLayout from '@/layouts/MainLayout';
import { config } from './routes.config';
import ProjectManagement from '@/pages/management/ProjectManagement';
import RoleManagement from '@/pages/management/RoleManagement';
import NotFound from '@/pages/NotFound';
import ActionManagement from '@/pages/management/ActionManagement';
import EmployeeManagement from '@/pages/management/EmployeeManagement';
import LeaveManagement from '@/pages/management/LeaveManagement';
import AuthLayout from '@/layouts/AuthLayout';

export const routes = (
  <Routes>
    <Route path={config.dashboard.root} Component={MainLayout}>
      <Route index element={<Dashboard />} />
      <Route path={config.dashboard.management.root.path}>
        <Route
          path={config.dashboard.management.project.path}
          element={<ProjectManagement />}
        />
        <Route
          path={config.dashboard.management.role.path}
          element={<RoleManagement />}
        />
        <Route
          path={config.dashboard.management.employee.path}
          element={<EmployeeManagement />}
        />
        <Route
          path={config.dashboard.management.action.path}
          element={<ActionManagement />}
        />
        <Route
          path={config.dashboard.management.leave.path}
          element={<LeaveManagement />}
        />
      </Route>
    </Route>
    <Route path='/auth' Component={AuthLayout}>
      <Route index path='/auth/login' element={<Login />} />
    </Route>

    <Route path='*' Component={NotFound} />
  </Routes>
);
