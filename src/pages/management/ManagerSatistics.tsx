import { selectCurrentCode } from '@/redux/features/auth/auth.slice';
import {
    useGetEmployeeByCodeQuery,
    useGetProjectByEmployeeQuery,
    useGetTimeEntryEmployeeQuery,
} from '@/services';
import { Card, Flex, Select, SelectProps } from 'antd';
import { set } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartStatistic } from '../../components/shared/Chart';
let chartareas={
          
    series: [{
      name: 'Cybersoft',
      data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10]
    }, {
      name: 'Project 1',
      data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null,]
    }, {
      name: 'Project 2',
      data: [null, null, null, null, 3, 4, 1, 3, 4,  6,  7,  9,]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        animations: {
          enabled: false
        }
      },
      stroke: {
        width: [5,5,4],
        curve: 'smooth'
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      
      xaxis: {
      },
    },
  
  
  };
let chartbarProject= {     
    series: [{
        name: 'Giờ công',
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        
      },
      //colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: ["Cybersoft", "Project 1", "Project 2", "Project 3", "Project 4", "Project 5", "Project 6", "Project 7"],
        labels: {
          style: {
            //colors: colors,
            fontSize: '12px'
          }
        }
      }
    },
};
let chartbarEmployee= {     
    series: [{
        name: 'Số lượng',
      data: [2, 3,4, 3, 2, 3, 4, 5]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        
      },
      //colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: ["Cybersoft", "Project 1", "Project 2", "Project 3", "Project 4", "Project 5", "Project 6", "Project 7"],
        labels: {
          style: {
            //colors: colors,
            fontSize: '12px'
          }
        }
      }
    },
};
export const ManagerStatistics = () => {

    return (<>
        <Flex justify={'flex-start'} align={'center'} style={{ gap: '16px' }}>
            <Card
                title='Tổng Dự án hiện tại'
                bordered={false}
                style={{ width: '23%' }}
            >
                <Flex justify={'center'} align={'center'} className='w-full h-20'>
                    <span className='text-4xl'>0</span>
                    <span className='ml-1 mt-4'> /dự án</span>
                </Flex>
            </Card>
            <Card
                title='Tổng giờ công '
                bordered={false}
                style={{ width: '23%' }}
            >
                <Flex justify={'center'} align={'center'} className='w-full h-20'>
                    <span className='text-4xl'>0</span>
                    <span className='ml-1 mt-4'> /h</span>
                </Flex>
            </Card>
            <Card
                title='Tổng Nhân viên tham gia'
                bordered={false}
                style={{ width: '23%' }}
            >
                <Flex justify={'center'} align={'center'} className='w-full h-20'>
                    <span className='text-4xl'>0</span>
                    <span className='ml-1 mt-4'> /người</span>
                </Flex>
            </Card>
            <Card
                title='Tổng ngày nghỉ sử dụng'
                bordered={false}
                style={{ width: '23%' }}
            >
                <Flex justify={'center'} align={'center'} className='w-full h-20'>
                    <span className='text-4xl'>0</span>
                    <span className='ml-1 mt-4'> /ngày</span>
                </Flex>
            </Card>
        </Flex>
        <Card className='w-full mt-5 '  >
        <h1>Tổng giờ công của dự án trong năm </h1>
            <ChartStatistic typeChart="line" data={chartareas}   ></ChartStatistic>
        </Card>
        <Flex justify={'start'} align={'center'} className='w-full gap-2'>
            <Card className='w-[50%] mt-5 '  >
                <h1>Tổng giờ công của từng dự án</h1>
                <ChartStatistic typeChart="bar" data={chartbarProject}   ></ChartStatistic>
            </Card>
            <Card className='w-[50%] mt-5 '  >
            <h1>Tổng nhân viên tham gia của từng dự án</h1>
            <ChartStatistic typeChart="bar" data={chartbarEmployee}   ></ChartStatistic>
            </Card>
        </Flex>
    </>)

}