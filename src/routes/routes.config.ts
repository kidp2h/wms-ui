export const config = {
  auth: {
    root: '/auth',
    login: '/auth/login',
  },
  root: '/',
  logout: '/logout',
  dashboard: {
    root: '/',
    profile: '/dashboard/profile',
    management: {
      root: {
        path: '/dashboard/management',
        name: 'Management',
        title: 'Management',
      },
      project: {
        path: '/dashboard/management/project',
        name: 'Management Project',
        title: 'Management Project',
      },
      schedule: {
        path: '/dashboard/management/schedule',
        name: 'Management Schedule',
        title: 'Management Schedule',
      },
      employee: {
        path: '/dashboard/management/employee',
        name: 'Management Employee',
        title: 'Management Employee',
      },
    },
  },
};
