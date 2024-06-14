import { createApi } from '@reduxjs/toolkit/query/react';
import { Project } from 'wms-types';
import { Response } from '.';
import { baseQueryWithReauth } from './api';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProjects: builder.query<Response<Project[]>, void>({
      query: () => `/projects`,
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
