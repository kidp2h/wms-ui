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
      role: {
        path: '/dashboard/management/role',
        name: 'Management Role',
        title: 'Management Role',
      },
      employee: {
        path: '/dashboard/management/employee',
        name: 'Management Employee',
        title: 'Management Employee',
      },
      action: {
        path: '/dashboard/management/action',
        name: 'Management Action',
        title: 'Management Action',
      },
      leave: {
        path: '/dashboard/management/leave',
        name: 'Management Leave',
        title: 'Management Leave',
      },
    },
  },
};
