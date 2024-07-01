import { useGetEmployeeQuery } from '@/services';
import { useEffect } from 'react';
import { EmployeeStatistics } from '@/components/dashboard/EmployeeStatistic';
import { ManagerStatistics } from '@/components/dashboard/ManagerStatistics';
import { Role } from 'wms-types';

export const Statistics = () => {
  const { data: response } = useGetEmployeeQuery();
  useEffect(() => {}, [response]);

  return (
    <>
      {response?.data?.role === Role.MANAGER ? (
        <>
          <div className='text-2xl uppercase bold mb-5'>Quản lý - Thống kê</div>

          <ManagerStatistics></ManagerStatistics>
        </>
      ) : (
        <>
          <div className='text-2xl uppercase bold mb-5'>
            Nhân viên - Thống kê
          </div>
          <EmployeeStatistics></EmployeeStatistics>
        </>
      )}
    </>
  );
};
