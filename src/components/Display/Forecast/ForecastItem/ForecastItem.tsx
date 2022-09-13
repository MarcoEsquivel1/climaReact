import { useWeatherStore } from '../../../../stores/weather-store'
import { PropItemForecast } from '../../../../interfaces/Interfaces';
import shallow from 'zustand/shallow'
import moment from 'moment-timezone';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box, Flex, HStack, Text, VStack, Grid
} from '@chakra-ui/react';

export const ForecastItem = (props: PropItemForecast) =>{
    const n = props.n;

    const { oneCallData, getIcon, degreeToCompassPoint, utcToLocal} = useWeatherStore(
        state => ({ 
            oneCallData: state.oneCallData,
            getIcon: state.getIcon,
            degreeToCompassPoint: state.degreeToCompassPoint,
            utcToLocal: state.utcToLocal
    }), shallow);

    return (
        <AccordionItem>
            <>
                <AccordionButton padding={0}>
                    <Box flex='1' textAlign='left'>
                        <Flex alignItems='center' textColor='#374151' fontWeight='bold'>
                            <Text mr={10}>{moment(utcToLocal(oneCallData?.daily[n].dt, oneCallData?.timezone)).format('ddd, MMM D')}</Text>
                            <>{<img src={getIcon(oneCallData?.daily[n].weather[0].icon)} alt="icon"/>}</>
                            <>
                                {
                                    oneCallData?.daily[n].temp.max+"/"+
                                    oneCallData?.daily[n].temp.min+"ºC"
                                }
                            </>
                        </Flex>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </>
            <AccordionPanel pb={4}>
                <Box>                                                                       
                    <Text textColor='#ea580c'>{ oneCallData?.daily[n].weather[0].description.toUpperCase()}</Text>
                    <HStack display='flex' flexWrap='wrap' columnGap={5} px={5} maxW='xs' borderLeftWidth='1px' borderColor='#ea580c'>
                        <Text flex='none' mr={5} textAlign='start'>{ "Rain: "+ (oneCallData?.daily[n].rain ?? '0') +'mm'}</Text>
                        <Text flex='none' ml={2} mr={5} textAlign='start'>{oneCallData?.daily[n].wind_speed+'m/s '+ degreeToCompassPoint(oneCallData?.daily[n].wind_deg)}</Text>
                        <Text flex='none' mr={5} textAlign='start'>{ oneCallData?.daily[n].pressure+'hPa'}</Text>
                        <Text flex='none' mr={5} textAlign='start'>{ "Humidity: "+ oneCallData?.daily[n].humidity+'%'}</Text>
                        <Text flex='none' mr={5} textAlign='start'>{ "UV: "+ oneCallData?.daily[n].uvi}</Text>
                        <Text flex='none' mr={5} textAlign='start'>{ "Dew Point: "+ oneCallData?.daily[n].dew_point+'ºC'}</Text>
                    </HStack>                                      
                </Box>
                <VStack spacing={1} alignItems='' mt={5} width="100%">
                    <Grid templateColumns='repeat(5, 1fr)' justifyItems='center' textColor='#6b7280' fontWeight='bold'>
                        <Text></Text>
                        <Text>Morning</Text>
                        <Text>Afternoon</Text>
                        <Text>Evening</Text>
                        <Text>Night</Text>
                    </Grid>
                    <Grid templateColumns='repeat(5, 1fr)' justifyItems='center' alignItems='center'>
                        <Text textColor='#9ca3af' fontSize='xs' justifySelf='start'>TEMPERATURE: </Text>
                        <Text>{oneCallData?.daily[n].temp.morn+"ºC"}</Text>
                        <Text>{oneCallData?.daily[n].temp.day+"ºC"}</Text>
                        <Text>{oneCallData?.daily[n].temp.eve+"ºC"}</Text>
                        <Text>{oneCallData?.daily[n].temp.night+"ºC"}</Text>
                    </Grid>
                    <Grid templateColumns='repeat(5, 1fr)' justifyItems='center' alignItems='center'>
                        <Text textColor='#9ca3af' fontSize='xs' justifySelf='start'>FEELS LIKE</Text>
                        <Text>{oneCallData?.daily[n].feels_like.morn+"ºC"}</Text>
                        <Text>{oneCallData?.daily[n].feels_like.day+"ºC"}</Text>
                        <Text>{oneCallData?.daily[n].feels_like.eve+"ºC"}</Text>
                        <Text>{oneCallData?.daily[n].feels_like.night+"ºC"}</Text>
                    </Grid>
                    <HStack spacing={5} display='flex' pt={5}>
                        <Flex flexDir='column' textAlign='center'>
                            <Text textColor='#9ca3af' fontSize='xs'>SUNRISE</Text>
                            <Text>{ moment(utcToLocal(oneCallData?.daily[n].sunrise,  oneCallData?.timezone)).format('hh:mm a')}</Text>
                        </Flex>
                        <Flex flexDir='column' textAlign='center'>
                            <Text textColor='#9ca3af' fontSize='xs'>SUNSET</Text>
                            <Text>{ moment(utcToLocal(oneCallData?.daily[n].sunset,  oneCallData?.timezone)).format('hh:mm a')}</Text>
                        </Flex>
                    </HStack>
                </VStack>
            </AccordionPanel>
        </AccordionItem>   
    );
}