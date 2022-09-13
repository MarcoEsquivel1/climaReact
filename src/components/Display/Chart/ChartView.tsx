import { useWeatherStore } from '../../../stores/weather-store';
import shallow from 'zustand/shallow'
import moment from 'moment-timezone';
import { Box } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
import { Chart } from 'react-chartjs-2';

export const ChartView = () =>{
    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        LineController,
        BarController
      );
    const {oneCallData, utcToLocal} = useWeatherStore(
        state => ({
            oneCallData: state.oneCallData,
            utcToLocal: state.utcToLocal
        }), shallow
    );

    var hoursLabel: string[] = [];
    var dataTemp: number[] = [];
    var weatherLabel: string[] = [];
    var dataRain: number[] = [];
    
    for (let i = 0; i < 8; i++) {
        const element = oneCallData?.hourly[i];
        hoursLabel.push(moment(utcToLocal(element?.dt, oneCallData?.timezone)).format('hh:mma'));
        dataTemp.push(element?.temp ?? 0);
        weatherLabel.push(element?.weather[0].description ?? '');
        if(element?.rain != undefined){
            dataRain.push(element?.rain['1h'])
        }
    }
    
    const data = {
        labels: hoursLabel,
        datasets:[
            {
                type: 'line' as const,
                label: 'ºC',
                borderColor: '#E9876B',
                borderWidth: 2,
                fill: false,
                data: dataTemp,
                yAxisID: 'y'
            },
            {
                type: 'bar' as const,
                label: "Rain mm/h",
                backgroundColor: '#D7EFEC',
                data: dataRain,
                borderColor: '#ceefff',
                borderWidth: 2,
                yAxisID: 'rain'
            }
        ]
    }

    return(
      <Box w={{base: '100%', lg:'50%'}}>    
        <Box pt={10} px={3} w="full" >    
          <Chart type='bar' 
            options={
              {
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    min: 0,
                    max: 45,
                    type: 'linear',
                    position: 'left',
                    grid:{
                      display: false
                    }
                  },
                  rain: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'right',
                  }
                }
              }
            } data={data} height={400} width={600}
          />
        </Box>
      </Box>
    );
}