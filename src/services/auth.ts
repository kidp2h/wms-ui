import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '@nthinh.dev/prisma';
import { Response } from '.';
import { RootState } from '@/redux/store';

export type LoginModel = {
  username: string;
  password: string;
};
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,

    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    authorize: builder.mutation<Response<{ accessToken: string }>, LoginModel>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (
        response: Response<{ accessToken: string }>,
        meta,
        arg,
      ) => response,
    }),
  }),
});

export const { useAuthorizeMutation } = authApi;
