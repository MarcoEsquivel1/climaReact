import { useWeatherStore } from "../../stores/weather-store";
import shallow from 'zustand/shallow'
import { Container, Box, Input, Button, } from '@chakra-ui/react'

export const Search = () =>{
    
    const {searchedCity, setSearchedCity, getCurrentWeather} = useWeatherStore(state => ({
        searchedCity: state.searchedCity,
        setSearchedCity: state.setSearchedCity,
        getCurrentWeather: state.getCurrentWeather
    }), shallow)
    
    const updateSearchTerm = (e: any) => {
        e.preventDefault();
        setSearchedCity(e.target.value);
    }
    
    return(
        <nav>
            <Box bg="#F2F2F2">
                <Container maxW='container.xl' py='1.75rem'>
                    <form  onSubmit={e => getCurrentWeather(e, searchedCity)}>
                        <Box  >
                            <Box w='50%' position='relative' display='flex' alignItems='center'>
                                <Input
                                    display='block' p='0.625rem' zIndex={20} fontSize='xs' lineHeight={5} textColor='#111727' bgColor='#f9fafb' 
                                    borderRadius='lg' borderColor='#d1d5db' _focus={{ringColor: '#3b82f6', borderColor: '#3b82f6'}} 
                                    type="text" 
                                    value={searchedCity} 
                                    name="city" 
                                    id="city" 
                                    placeholder="Ingrese una ciudad" 
                                    onChange={updateSearchTerm}
                                />
                                <Button
                                    _disabled={{bgColor: '#374151'}} position='absolute' zIndex={100} top={0} right={0} p='0.625rem' fontSize='sm' fontWeight='medium' textColor='white' 
                                    bgColor='#48484a' borderTopRightRadius='lg' borderBottomRightRadius='lg' borderLeftRadius='none' borderWidth='1px' _hover={{bgColor: '#48484a'}} _focus={{ring: 4, outline: 'none', bgColor: '#d1d5db'}}
                                    type="submit"
                                    disabled={!searchedCity.trim()}
                                >
                                    Buscar
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Container>
            </Box>
        </nav>
    );
}