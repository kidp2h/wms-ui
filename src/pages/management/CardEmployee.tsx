import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import {
  useGetEmployeeByCodeQuery,
  useGetProjectByEmployeeQuery,
  useGetProjectsQuery,
  useGetTimeEntryEmployeeQuery,
} from '@/services';
import { Card, Flex, Select, SelectProps } from 'antd';
import { set } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Daynow = new Date();  

export const CardEmployee = () => {
  const [date, setDate] = useState<number>(Daynow.getFullYear());
  const { data: timeentry } = useGetTimeEntryEmployeeQuery({employeeId:undefined,type: 'PROJECT'});
  const { data: timeleave } = useGetTimeEntryEmployeeQuery({employeeId:undefined,type: 'LEAVE'});
  const { data: projectsemployee } = useGetProjectByEmployeeQuery({
    year: date,type: 'PROJECT',
  });
  const { data: ProjectLeaveDay } = useGetProjectsQuery();
  const [totalProject, setTotalProject] = useState<string>('0');
  const [totalTimeEntry, setTotalTimeEntry] = useState<string>('0');
  const [Leaveday, setLeaveday] = useState<string>('0');
  const [LeaveDayused, setLeaveDayused] = useState<string>('0');
  useEffect(() => {
    if (projectsemployee?.data) {
      const projects: any = projectsemployee?.data || [];
      setTotalProject(projects.length.toString());
      if(ProjectLeaveDay?.data){
      const totalleave: any = ProjectLeaveDay?.data?.reduce((acc: any, time: any) => {
        acc += time.limit;
        return acc;
      }, 0);
      const totalleaveUsed: number = timeleave?.data?.reduce((acc: any, time: any) => {
        if( new Date(time.date.toString()).getFullYear() === date)
        acc += time.hours;
        return acc;
      }, 0);
      setLeaveDayused(( parseFloat((totalleaveUsed / 8).toFixed(1)) ).toString());
      setLeaveday('12');

      }
     console.log(timeentry?.data)
      const totaltime =
        timeentry?.data?.reduce((acc, time) => {
          if( new Date(time.date.toString()).getFullYear() === date)
          acc += time.hours 
          return acc;
        }, 0) || '0';
      setTotalTimeEntry(totaltime.toString());
    }
  }, [projectsemployee,ProjectLeaveDay,timeentry,timeleave]);




return( <>
  <Flex justify={'flex-start'} align={'center'} style={{ gap: '16px' }}>
        <Card
          title='Tổng Dự án tham gia'
          bordered={false}
          style={{ width: '23%' }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{totalProject}</span>
            <span className='ml-1 mt-4'> /dự án</span>
          </Flex>
        </Card>
        <Card
          title='Tổng giờ công tham gia'
          bordered={false}
          style={{ width: '23%' }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{totalTimeEntry}</span>
            <span className='ml-1 mt-4'> /h</span>
          </Flex>
        </Card>
        <Card
          title='Tổng ngày được nghỉ '
          bordered={false}
          style={{ width: '23%' }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{Leaveday}</span>
            <span className='ml-1 mt-4'> /ngày</span>
          </Flex>
        </Card>
        <Card
          title='Tổng ngày nghỉ sử dụng'
          bordered={false}
          style={{ width: '23%' }}
        >
          <Flex justify={'center'} align={'center'} className='w-full h-20'>
            <span className='text-4xl'>{LeaveDayused}</span>
            <span className='ml-1 mt-4'> /ngày</span>
          </Flex>
        </Card>
      </Flex>



</> )


};