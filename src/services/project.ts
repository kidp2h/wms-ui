import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Project } from 'wms-types';
import { Response } from '.';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { baseQueryWithReauth } from './api';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjectById: builder.query<Response<Project>, string>({
      query: (id) => `/project/${id}`,
    }),
    getProjectByEmployee: builder.query<
      Response<Project>,
      { id: string; year?: number }
    >({
      query: ({ id, year }) => {
        let url = `/employee/project/${id}`;
        if (year) {
          url += `?year=${year}`;
        }
        return url;
      },
    }),
    getProjects: builder.query<Response<Project[]>, void>({
      query: () => '/projects',
      providesTags: ['Projects'],
    }),
    searchProject: builder.query<Response<Project[]>, string>({
      query: (content) => `/projects?code=${content}`,
      providesTags: ['Projects'],
    }),

    updateProject: builder.mutation<Response<Project>, Partial<Project>>({
      query: (body) => ({
        url: `/project/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
    addProject: builder.mutation<
      Response<Project>,
      Pick<
        Project,
        | 'code'
        | 'name'
        | 'description'
        | 'status'
        | 'type'
        | 'typeLeave'
        | 'limit'
      >
    >({
      query: (body) => ({
        url: `/project`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
    removeProject: builder.mutation<Response<Project>, string>({
      query: (id) => ({
        url: `/project/remove/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Projects'],
    }),
  }),
});
export const {
  useGetProjectByIdQuery,
  useGetProjectByEmployeeQuery,
  useGetProjectsQuery,
  useSearchProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useRemoveProjectMutation,
} = projectApi;
