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

let state = {

    series: [{
        name: "Giờ công",
        data: [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]
        },
        {
            name: "Tăng ca",
            data: [8,2,2,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,8,8,8,8,8,8,8,8]
        }],
    options: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              
            },
          },
      xaxis: {
        type: 'datetime',
            categories:    getDaysArray(2024, 6)
      },
      yaxis: {
        min: 0,
        max: 20 
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },



};
let chartPie = {
          
  series: [44, 55, 13,],
  options: {
    chart: {
      width: 350,
      height: 350,
      type: 'pie',
    },
    labels: ['Ngày nghỉ khác', 'Ngày nghỉ phép','Ngày nghỉ bệnh'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 350
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },


};
let chartColumn ={     
  series: [{
      name: 'Giờ công',
    data: [21, 22, 10, 28, 16, 21, 13, 30]
  }],
  options: {
    chart: {
      height: 330,
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



function getDaysArray(year: number, month: number) {
    let numDays = new Date(year, month, 0).getDate();
    let daysArray = [];
    for (let i = 1; i <= numDays; i++) {
        let date = new Date(year, month - 1, i+1);  // Chú ý tháng trong JavaScript được đếm từ 0
        daysArray.push(date.toISOString().split('T')[0]);  // Định dạng YYYY-MM-DD
    }
    return daysArray;
}


const options: SelectProps['options'] = [{ value:'1' ,label: "CyberSoft" }, { value:'2',label: 'Project 1' }];
const Daynow = new Date();  

export const EmployeeStatistics = () => {
    
  const [date, setDate] = useState<number>(Daynow.getFullYear());
  const { data: timeentry } = useGetTimeEntryEmployeeQuery(null);
  const { data: projectsemployee } = useGetProjectByEmployeeQuery({
    year: date,
  });

  const [totalProject, setTotalProject] = useState<string>('0');
  const [totalTimeEntry, setTotalTimeEntry] = useState<string>('0');
  const [Leaveday, setLeaveday] = useState<string>('0');
  const [Flag,setFlag] = useState<boolean>(true);

  useEffect(() => {
    if (projectsemployee?.data) {
      const projects: any = projectsemployee?.data || [];
      setTotalProject(projects.length.toString());
      const totalleave: any = projects.reduce((acc: any, project: any) => {
        acc += project.limit;
        return acc;
      }, 0);
      setLeaveday(totalleave.toString());
      const totaltime =
        timeentry?.data?.reduce((acc, time) => {
          acc += time.hours /*them cai overtime   */;
          return acc;
        }, 0) || '0';
      console.log(timeentry?.data);
      setTotalTimeEntry(totaltime.toString());
    }
  }, [date]);
  const handleChange = (value: string) => {
    setDate(parseInt(value));
    console.log(date);
  };
  const ChangeDay = (value: boolean) => {
    setFlag(value)
  };
  return (
    <>
     

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
            <span className='text-4xl'>{Leaveday}</span>
            <span className='ml-1 mt-4'> /ngày</span>
          </Flex>
        </Card>
      </Flex>
      <Flex justify={'start'} align={'center'} className='w-full h-20 gap-1'>
      <Select
        showSearch
        placeholder='Select a Project'
        onChange={handleChange}
        options={options}
        style={{ width: 150}}
        defaultValue={options[0].label as string}
      />
      <span> /   </span>
      <Select
        showSearch
        onChange={ChangeDay}
        options={[{
          value: true,
          label: 'Theo Ngày',
        },
        {
          value: false,
          label: 'Theo Tuần',
        },
        ]}
        style={{ width: 150}}
        defaultValue={true}
      />

      {Flag &&
      <><span> / </span> <Select
            showSearch
            onChange={handleChange}
            options={[
              {
                value: '1',
                label: 'Tháng 1',
              },
              {
                value: '2',
                label: 'Tháng 2',
              },
              {
                value: '3',
                label: 'Tháng 3',
              },
            ]}
            style={{ width: 150 }}
            defaultValue={'Tháng 1'} /></>
      }
      </Flex>  
   
    <Card className='w-full '  > 
      <ChartStatistic  typeChart="bar" data={state} ></ChartStatistic>
    </Card>
    <Flex justify={'start'} align={'center'} className='w-full gap-2'>
            <Card className='w-[50%] mt-5 '  >
                <h1>tổng Các ngày nghỉ </h1>
                <ChartStatistic typeChart="pie" data={chartPie}  ></ChartStatistic>
            </Card>
            <Card className='w-[50%] mt-5 '  >
            <h1>Tổng giờ công của từng dự án</h1>
            <ChartStatistic typeChart="bar" data={chartColumn}   ></ChartStatistic>
            </Card>
        </Flex>


    </>
  );
};
