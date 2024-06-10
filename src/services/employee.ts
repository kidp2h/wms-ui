import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '@nthinh.dev/prisma';
import { Response } from '.';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { baseQueryWithReauth } from './api';


export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `/employee/${id}`,
    }),
    getEmployees: builder.query<Response<Employee[]>, void>({
      query: () => '/employees',
      providesTags: ['Employees'],
    }),
    addEmployee: builder.mutation<Response<Employee>, Pick<Employee, 'code' | 'role' | 'email' | 'password' | 'fullname'>>({
      query: (body) => ({
        url: `/employee`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employees']
    }),
    removeEmployee: builder.mutation<Response<Employee>, string>({
      query: (id) => ({
        url: `/employee/remove/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Employees']
    })
  }),
});

export const { useGetEmployeeByIdQuery, useAddEmployeeMutation, useGetEmployeesQuery, useLazyGetEmployeeByIdQuery, useRemoveEmployeeMutation } =
  employeeApi;
