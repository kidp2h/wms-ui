export interface Response<T> {
  status: number;
  message: string | null;
  data: T | null;
}
export * from './employee';
export * from './auth';
