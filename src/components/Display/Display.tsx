import { useWeatherStore } from '../../stores/weather-store'
import shallow from 'zustand/shallow'
import { Current } from './Current';
import { Forecast } from './Forecast';
import { Container, Box, Text } from '@chakra-ui/react'
import { ChartView } from './Chart';


export const Display = () =>{
    const {oneCallData, currentWeather, isLoading, errorMessage, hasError} = useWeatherStore(
        state => ({ 
            oneCallData: state.oneCallData,
            currentWeather: state.currentWeather,
            isLoading: state.isLoading, 
            errorMessage: state.errorMessage, 
            hasError: state.hasError,
        }), shallow);
        
    if(isLoading){return(<Container maxW='container.xl'><Box pt={10}><Text fontSize='3xl' fontWeight='bold' textColor='#1f2937'>Cargando...</Text ></Box></Container>)}
    if(hasError){return(<Container maxW='container.xl'><Box pt={10}><Text fontSize='3xl' fontWeight='bold' textColor='red'>{errorMessage}</Text ></Box></Container>)}
    return (   
        <Container maxW='container.xl' display="flex" flexWrap='wrap'>
            {
                oneCallData?.timezone == undefined || currentWeather?.name == undefined ? <Box pt={10}><Text fontSize='3xl' fontWeight='bold' textColor='#1f2937'>No se ha buscado ciudad</Text ></Box> : (
                    <>
                        <Current/>
                        <Box display='flex' flexWrap='wrap' w='full'>
                            <ChartView/>
                            <Forecast/>
                        </Box>
                    </>
                )
            }      
        </Container>
    )
}