import { createApi } from '@reduxjs/toolkit/query/react';
import { TimeEntryProject } from 'wms-types';
import { Response } from '.';
import { baseQueryWithReauth } from './api';

export const timeEntryApi = createApi({
  reducerPath: 'timeEntryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['TimeEntry'],
  endpoints: (builder) => ({
    getTimeEntryEmployee: builder.query<Response<TimeEntryProject[]>, void>({
      query: () => `/employee/time-entries`,
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
  useGetTimeEntryEmployeeQuery,
  useUpdateTimeEntryEmployeeMutation,
} = timeEntryApi;
