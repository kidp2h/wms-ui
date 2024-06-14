export interface Response<T> {
  status: number;
  message: string | null;
  data: T | null;
}

export * from './employee';
export * from './auth';
export * from './timeEntry';
export * from './project';
