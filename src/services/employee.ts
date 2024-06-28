import { createApi } from '@reduxjs/toolkit/query/react';
import { Employee } from 'wms-types';
import { PaginatedResult, PayloadPaginate, Response } from '.';
import { baseQueryWithReauth } from './api';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getEmployeeById: builder.query<Response<Employee>, string>({
      query: (id) => `/employee/${id}`,
    }),
    getEmployeeByCode: builder.query<Response<Employee>, string>({
      query: (code) => `/employee?code=${code}`,
    }),
    getEmployees: builder.query<Response<Employee[]>, void>({
      query: () => '/employees',
      providesTags: ['Employees'],
    }),
    paginateEmployees: builder.mutation<
      Response<PaginatedResult<Employee>>,
      PayloadPaginate
    >({
      query: (payload: PayloadPaginate) => ({
        url: `/paginate/employees?page=${payload?.paginate?.page || 1}&limit=${payload?.paginate?.limit || 10}&perPage=${payload?.paginate?.perPage || 10}`,
        method: 'POST',
        body: payload?.body || {},
        providesTags: ['Employees'],
      }),
    }),
    updateEmployee: builder.mutation<Response<Employee>, Partial<Employee>>({
      query: (body) => ({
        url: `/employee/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Employees'],
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
  useUpdateEmployeeMutation,
  usePaginateEmployeesMutation,
} = employeeApi;
