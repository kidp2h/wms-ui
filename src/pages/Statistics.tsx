import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import {
  
  useGetEmployeeByIdQuery,
  useGetEmployeeQuery,
  useGetProjectByEmployeeQuery,
  useGetTimeEntryEmployeeQuery,
} from '@/services';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EmployeeStatistics } from './management/EmployeeStatistic';
import { Role } from 'wms-types';

export const Statistics = () => {
  const { data: response, isLoading } = useGetEmployeeQuery();
  useEffect(() => {
  }, [response]);
  return (
    <>
      {/* {response?.data?.role === Role.MANAGER ? ( */}
      {/*   <ManagerStatistics></ManagerStatistics> */}
      {/* ) : ( */}
      {/*   <EmployeeStatistics></EmployeeStatistics> */}
      {/* )} */}
      {/* <ManagerStatistics></ManagerStatistics> */}
      <EmployeeStatistics></EmployeeStatistics>
    </>
  );
};
