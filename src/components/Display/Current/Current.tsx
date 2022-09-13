import { useWeatherStore } from '../../../stores/weather-store';
import shallow from 'zustand/shallow'
import moment from 'moment-timezone';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';

export const Current = () =>{
    const {oneCallData, currentWeather, getIcon, mToKm, degreeToCompassPoint, utcToLocal} = useWeatherStore(
        state => ({
            oneCallData: state.oneCallData,
            currentWeather: state.currentWeather, 
            getIcon: state.getIcon,
            mToKm: state.mToKm,
            degreeToCompassPoint: state.degreeToCompassPoint, 
            utcToLocal: state.utcToLocal
        }), shallow);
    return(
        <Box w={{base: '100%'}}>                             
            <Box pt={10} w={{base: '100%', lg:'33%'}} mx={10}>
                <Text textColor='#c2412c'>{ moment(utcToLocal(moment().unix(), oneCallData?.timezone)).format('MMM D, hh:mm a')}</Text>
                <Text fontSize='2xl' fontWeight='bold' textColor='#374151'>{currentWeather?.name + ', ' + currentWeather?.sys?.country}</Text>
                
                <Flex mt={5}>
                    <>{ <img src={getIcon(oneCallData?.current.weather[0].icon)} alt="icon"/> }</>
                    <Text fontSize='4xl' textColor='#374151'>{ oneCallData?.current.temp+'ºC'}</Text>
                </Flex>
                <HStack display='flex' mt={2} textColor='#374151' fontWeight='bold'>
                    <Text>{ "Feels Like "+oneCallData?.current.feels_like+"ºC."}</Text>
                    <Text>{ oneCallData?.current.weather[0].description}</Text>
                </HStack>

                <HStack display='flex' flexWrap='wrap' columnGap={5} px={5} maxW='xs' borderLeftWidth='1px' borderColor='#ea580c'>
                    <Text flex='none' ml={2} mr={5} textAlign='start'>{oneCallData?.current.wind_speed+'m/s '+ degreeToCompassPoint(oneCallData?.current.wind_deg)}</Text>
                    <Text flex='none' mr={5} textAlign='start'>{oneCallData?.current.pressure+'hPa'}</Text>
                    <Text flex='none' mr={5} textAlign='start'>{"Humidity: "+oneCallData?.current.humidity+'%'}</Text>
                    <Text flex='none' mr={5} textAlign='start'>{"Visibility: "+ mToKm(oneCallData?.current.visibility)+'km'}</Text>
                    {oneCallData?.current.rain != undefined ? <Text flex='none' mr={5} textAlign='start'>{ "Rain: " + oneCallData?.current.rain['1h']+'mm'}</Text> : '' }
                    {oneCallData?.current.uvi != undefined ? <Text flex='none' mr={5} textAlign='start'>{ "UV: " + oneCallData?.current.uvi}</Text> : '' }
                    {oneCallData?.current.dew_point != undefined ? <Text flex='none' mr={5} textAlign='start'>{ "Dew point: " + oneCallData?.current.dew_point+"ºC"}</Text> : '' }
                </HStack>
            </Box>   
        </Box>
    )
}