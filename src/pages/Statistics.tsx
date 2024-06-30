import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import {
  
  useGetEmployeeByIdQuery,
  useGetEmployeeQuery,
  useGetProjectByEmployeeQuery,
  useGetTimeEntryEmployeeQuery,
} from '@/services';
import { Card, Flex, Select, SelectProps } from 'antd';
import { set } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EmployeeStatistics } from './management/EmployeeStatistic';
import { ManagerStatistics } from './management/ManagerSatistics';
import { Role } from 'wms-types';



export const Statistics = () => {
  const { data: response, isLoading } = useGetEmployeeQuery();
  useEffect(() => {
  }, [response]);
  return (
    <>
    {response?.data?.role === Role.MANAGER ?  <ManagerStatistics></ManagerStatistics> :<EmployeeStatistics></EmployeeStatistics> }
      
    </>
  );
};
