import create from "zustand";
import apiCall from "../api";
import moment from 'moment-timezone';
import { Context, CurrentWeatherDataResponse, OneCallDataResponse } from "../interfaces/Interfaces";

const apiKey = '9a5b6a0593a0e4fe6fec9ef483c4e41b';
const oneKey = '7de505b61d195d10781e185a65c51b68';
const iconURL = 'http://openweathermap.org/img/wn/';
const exclude = 'minutely';

//https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
export const useWeatherStore = create<Context>((set, get) => ({
    getCurrentWeather: async (e: any, cityName: string) => {
        e.preventDefault();
        if (!cityName) Promise.reject('Es requerido ingresar el nombre de la ciudad');
        try {
            set({isLoading: true, hasError: false, errorMessage: ""});
            const weather = await apiCall({url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`});
            if(weather === ''){
                set({hasError: true, errorMessage: 'Ingrese una ciudad valida!'});
            }else{
                const onecall = await apiCall({url: `https://api.openweathermap.org/data/3.0/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&exclude=${exclude}&appid=${oneKey}`});
                set({oneCallData: onecall});
            }
            set({currentWeather: weather});
        } catch (error) {
            set({ oneCallData: {} as OneCallDataResponse, currentWeather: {} as CurrentWeatherDataResponse, hasError: true, errorMessage: 'Ha ocurrido un error'});
        }finally{
            set({isLoading: false, searchedCity: ''});
        }
    }, 
    currentWeather:{} as CurrentWeatherDataResponse,
    oneCallData: {} as OneCallDataResponse,
    isLoading: false, 
    errorMessage: '', 
    hasError : false,
    searchedCity: '',
    setSearchedCity: (city: string) => {
        set({searchedCity: city});
    },
    getIcon:(icon: string) => {
        return iconURL+icon+'.png';
    },
    mToKm: (mts: number) =>{
        return mts/1000;
    },
    degreeToCompassPoint: (wind_deg: number) => {
        const compassPoints = ["N", "NNE", "NE", "ENE", 
                               "E", "ESE", "SE", "SSE",
                               "S", "SSW", "SW", "WSW", 
                               "W", "WNW", "NW", "NNW"];
        const rawPosition = Math.floor((wind_deg / 22.5) + 0.5);
        const arrayPosition = (rawPosition % 16);
        return compassPoints[arrayPosition];
    },
    utcToLocal: (Time: any, timez: any) => {
        return moment.unix(Time).tz(timez).format("MM-DD-YYYY HH:mm:ss");
    }
}));
