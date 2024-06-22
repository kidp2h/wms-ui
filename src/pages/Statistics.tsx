import { ProjectSchedule } from '@/components/dashboard/ProjectSchedule';
import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import { projectApi, useGetEmployeeByCodeQuery, useGetProjectByIdQuery, useGetProjectsQuery,useGetTimeEntryEmployeeQuery } from '@/services';
import { current } from '@reduxjs/toolkit';
import { Card, Flex, Tabs, TabsProps } from 'antd';
import { forEach } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const fetchUsers =  (projectid:string) => {
    return  fetch("http://localhost:8334/api/v1.0/project/"+projectid)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error(error);
        throw error;
    });
}

export const Satistics = () => {
    const code = useSelector(selectCurrentCode);
    const { data: currentuser } = useGetEmployeeByCodeQuery(code || '');
   
    const {data: response} = useGetTimeEntryEmployeeQuery(currentuser?.data?.id || ''); 
    const [totalProject, setTotalProject] = useState<string>('0');
    const [totalTimeEntry,setTotalTimeEntry] = useState<string>('0'); 
    const [Leaveday,setLeaveday] = useState<string>('0');
    const [tempprojectID,setTempprojectID] = useState<string>('0');
    const {data: response1 }= useGetProjectByIdQuery(tempprojectID)

      useEffect(() => {
        let tempproject=''
        let total =0
        let totalLeaveday =0
        let test: string[] =[]
        const currnentday = new Date()
        setTotalTimeEntry(response?.data.reduce((acc,current) => acc +  current.hours,0).toString() || '0')
        response.data.forEach(x => {
            const project_date = new Date(x.date)
            if(x.projectId != tempproject && project_date.getFullYear() ==currnentday.getFullYear()){
                total++
                tempproject = x.projectId
                test.push(tempproject)
            }
        });
        test.forEach(x => {
            fetchUsers(x).then((data) => {
                console.log("ddd", data.data.limit)
               totalLeaveday += data.data.limit
               setLeaveday(totalLeaveday.toString())
            });

        })
       
        setTotalProject(total.toString())
      },[response]
    )

    return (
        <Flex justify={'flex-start'} align={'center'} style={{ gap: '16px' }}>
            <Card title="Tổng Dự án tham gia" bordered={false} style={{ width: 300 }}>
                <Flex justify={'center'} align={'center'} className='w-full h-20' >
                    <span className='text-4xl'  >{totalProject}</span>
                    <span className='ml-1 mt-4'> /dự án</span>
                </Flex>
            </Card>
            <Card title="Tổng giờ công của dự án" bordered={false} style={{ width: 300 }}>
                <Flex justify={'center'} align={'center'} className='w-full h-20' >
                    <span className='text-4xl'  >{totalTimeEntry}</span>
                    <span className='ml-1 mt-4'> /h</span>
                </Flex>
            </Card>
            <Card title="Tổng ngày được nghỉ " bordered={false} style={{ width: 300 }}>
                <Flex justify={'center'} align={'center'} className='w-full h-20'>
                    <span className='text-4xl'  >{Leaveday}</span>
                    <span className='ml-1 mt-4'> /ngày</span>
                </Flex>
            </Card>
        </Flex>

    )
}