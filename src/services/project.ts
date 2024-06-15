import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '@nthinh.dev/prisma';
import { Response } from '.';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { baseQueryWithReauth } from './api';

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: baseQueryWithReauth,
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjectById: builder.query<Project, string>({
      query: (id) => `/project/${id}`,
    }),
    getProjects: builder.query<Response<Project[]>, void>({
      query: () => '/projects',
      providesTags: ['Projects'],
    }),
    getProjectsbySreach: builder.query<Response<Project[]>, string>({
      query: (content) => `/projects?code=${content}`,
      providesTags: ['Projects'],
    }),
    addProject: builder.mutation<Response<Project>, Pick<Project, 'code' | 'name' | 'description' | 'status' | 'type'|'typeLeave'|'limit'>>({
      query: (body) => ({
        url: `/project`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Projects']
    }),
    removeProject: builder.mutation<Response<Project>, string>({
      query: (id) => ({
        url: `/project/remove/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Projects']
    })
  }),
});
export const { useGetProjectByIdQuery, useGetProjectsQuery,useGetProjectsbySreachQuery, useAddProjectMutation, useRemoveProjectMutation } =
projectApi;