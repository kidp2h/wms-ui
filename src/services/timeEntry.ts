import { createApi } from '@reduxjs/toolkit/query/react';
import { TimeEntryProject } from 'wms-types';
import { Response } from '.';
import { baseQueryWithReauth } from './api';

export const timeEntryApi = createApi({
  reducerPath: 'timeEntryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['TimeEntry'],
  endpoints: (builder) => ({
    getTimeEntrys: builder.query<Response<TimeEntryProject[]>, void>({
      query: () => '/time-entries',
      providesTags: ['TimeEntry'],
    }),


    getTimeEntryEmployee: builder.query<
      Response<TimeEntryProject[]>,
      {  employeeId?: string ,type?: string}
    >({
      query: ({employeeId,type}) => {
        console.log(type)
        if(type){
          return `/employee/time-entries/{id}?type=${type}`;
        }
        if (employeeId) {
          // INFO: get employee's time entries by employeeId
          return `/employee/time-entries/${employeeId}`;
        } else {
          // INFO: get self employee's by token
          return `/employee/time-entries/{id}`;
        }
      },
      providesTags: ['TimeEntry'],
    }),

    updateTimeEntryEmployee: builder.mutation<
      Response<TimeEntryProject[]>,
      Partial<TimeEntryProject>[]
    >({
      query: (timeEntries: Partial<TimeEntryProject>[]) => ({
        url: `/employee/time-entries`,
        method: 'PUT',
        body: timeEntries,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
  }),
});

export const {
  useGetTimeEntrysQuery,
  useGetTimeEntryEmployeeQuery,
  useUpdateTimeEntryEmployeeMutation,
} = timeEntryApi;
