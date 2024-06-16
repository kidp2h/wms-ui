import { createApi } from '@reduxjs/toolkit/query/react';
import { Employee } from 'wms-types';
import { Response } from '.';
import { baseQueryWithReauth } from './api';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `/employee/${id}`,
    }),
    getEmployeeByCode: builder.query<Employee, string>({
      query: (code) => `/employee?code=${code}`,
    }),
    getEmployees: builder.query<Response<Employee[]>, void>({
      query: () => '/employees',
      providesTags: ['Employees'],
    }),
    addEmployee: builder.mutation<
      Response<Employee>,
      Pick<Employee, 'code' | 'role' | 'email' | 'password' | 'fullname'>
    >({
      query: (body) => ({
        url: `/employee`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employees'],
    }),
    removeEmployee: builder.mutation<Response<Employee>, string>({
      query: (id) => ({
        url: `/employee/remove/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Employees'],
    }),
  }),
});

export const {
  useGetEmployeeByIdQuery,
  useGetEmployeeByCodeQuery,
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useLazyGetEmployeeByIdQuery,
  useRemoveEmployeeMutation,
} = employeeApi;
