import {
    Accordion,
    Box
} from '@chakra-ui/react';
import { ForecastItem } from './ForecastItem';

export const Forecast = () => {       
    return (   
        <Box w={{base: '100%', lg:'50%'}} >                                                  
            <Box pt={10} px={{base:10, lg:20}} w="full">
                <Accordion allowToggle maxHeight={700}>
                    <ForecastItem n={0}/>                                                                     
                    <ForecastItem n={1}/>                                                                     
                    <ForecastItem n={2}/>                                                                     
                    <ForecastItem n={3}/>                                                                     
                    <ForecastItem n={4}/>                                                                     
                    <ForecastItem n={5}/>                                                                     
                    <ForecastItem n={6}/>                                                                     
                    <ForecastItem n={7}/>                                                                     
                </Accordion>                    
            </Box>                       
        </Box>
    )
}