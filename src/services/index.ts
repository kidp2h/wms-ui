import { setCredentials } from '@/redux/features/auth/auth.slice';
import { RootState } from '@/redux/store';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';

export interface Response<T> {
  status: number;
  message: string | null;
  data: T | null;
}


export * from './employee';
export * from './auth';

