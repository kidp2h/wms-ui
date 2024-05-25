import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '@nthinh.dev/prisma';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
  endpoints: (builder) => ({
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `/employee/${id}`,
    }),
  }),
});

export const { useGetEmployeeByIdQuery, useLazyGetEmployeeByIdQuery } =
  employeeApi;
