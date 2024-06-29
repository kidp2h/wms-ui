
import { Card, Flex, Select, SelectProps } from 'antd';
import { set } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartStatistic } from '../../components/shared/Chart';
import { CardManager } from './CardManager';
import { useGetProjectsQuery, useGetTimeEntrysQuery } from '@/services';
let chartareas={
          
    series: [],
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
    series: [],
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
        categories: [],
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
    series: [
      {
        name: 'Số lượng',
        data: []
      }

    ],
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
        categories: [],
        labels: {
          style: {
            //colors: colors,
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (value:number) {
            return Math.round(value); // Làm tròn giá trị đến số nguyên gần nhất
          }
        },
        max: function(max:number) {
          return Math.max(...chartbarEmployee.series[0].data) + 5; // Tính max và cộng thêm 5 đơn vị
      }
      }
    },
    
};
function filterProperties(obj:any, keysToKeep:any[]) {
  const filteredObj: any = {}; 
  keysToKeep.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
}


export const ManagerStatistics = () => {
  const [stateTotal, setStateTotal] = useState(chartareas);
  const [stateProject, setStateProject] = useState(chartbarProject);
  const [stateEmployee, setStateEmployee] = useState(chartbarEmployee);
  const {data:response,refetch:refetchProjects } = useGetProjectsQuery()
  const {data:responseTimeEntry,refetch} = useGetTimeEntrysQuery()
  useEffect(()=>{
    refetch()
    refetchProjects()
    if(response?.data){
      let seriesTotal:any[] = []
      //data tong
      response?.data.forEach(x => {
        if(x.type == 'PROJECT'){
         const data ={
            id:x.id,
            name:x.name,
            data:[],
            employee:[],
            startAt:x.startDate,
            endAt:x.endDate
         }
         seriesTotal.push(data)
        }
      });
      seriesTotal.forEach(x=>{
        let data:any[] = []
        for (let i = 1; i <= 12; i++) {
          let total = 0
          responseTimeEntry?.data?.forEach(y=>{
            if(y.projectId == x.id && new Date(y.date.toString()).getMonth()+1 == i){
              total += y.hours
            }
             if(!x.employee.includes(y.employeeId)){
              x.employee.push(y.employeeId)
             }
          })
          if(total == 0){
            data.push(null)
          }else
          data.push(total)
        }
        x.data = data
      })
      chartareas.series.push(...seriesTotal.map(x=> filterProperties(x,['name','data'])) as never[])
      //prject
      chartbarProject.options.xaxis.categories = seriesTotal.map(x=>x.name) as never[]
      const seriesCharBarProject =[{
        name:'Giờ công',
        data:seriesTotal.map(x=>x.data.reduce((a:any,b:any)=>a+b,0))
      }]
      chartbarProject.series = seriesCharBarProject as never[]
      //employee
      chartbarEmployee.options.xaxis.categories = seriesTotal.map(x=>x.name) as never[]

      const seriesCharBarEmployee =[{
        name:'Số lượng',
        data:seriesTotal.map(x=>x.employee.length)
      }]
      chartbarEmployee.series = seriesCharBarEmployee as never[]
      setStateEmployee(chartbarEmployee)
      setStateProject(chartbarProject)
      setStateTotal(chartareas)
    }


  },[response,responseTimeEntry])
    return (<>
       <CardManager></CardManager>
        <Card className='w-full mt-5 '  >
        <h1>Tổng giờ công của dự án trong năm </h1>
            <ChartStatistic typeChart="line" data={stateTotal}   ></ChartStatistic>
        </Card>
        <Flex justify={'start'} align={'center'} className='w-full gap-2'>
            <Card className='w-[50%] mt-5 '  >
                <h1>Tổng giờ công của từng dự án</h1>
                <ChartStatistic typeChart="bar" data={stateProject}   ></ChartStatistic>
            </Card>
            <Card className='w-[50%] mt-5 '  >
            <h1>Tổng nhân viên tham gia của từng dự án</h1>
            <ChartStatistic typeChart="bar" data={stateEmployee}   ></ChartStatistic>
            </Card>
        </Flex>
    </>)

}