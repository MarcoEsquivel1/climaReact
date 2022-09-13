export interface CallData{
    url: string,
    method?: string,
    body?: any,
    headers?: any
}

export interface PropItemForecast{
    n: number
}

export interface Context { 
    currentWeather?: CurrentWeatherDataResponse,
    oneCallData?: OneCallDataResponse,
    getCurrentWeather: Function,
    isLoading: boolean, 
    errorMessage: string, 
    hasError: boolean,
    searchedCity: string,
    setSearchedCity: Function,
    getIcon: Function,
    mToKm: Function,
    degreeToCompassPoint: Function,
    utcToLocal: Function
}

export interface DataChart{
    hoursLabel: string[];
    dataTemp: string[];
    weatherLabel: string[];
    dataRain: string[];
}

interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface Rain {
    '1h': number,
    '3h': number
}

export interface CurrentWeatherDataResponse {
    coord?: Coord;
    sys?: Sys;
    id?: number;
    name?: string;
}

export interface OneCallDataResponse{
    current: Current,
    daily: Daily[],
    hourly: Hourly[],
    lat: number,
    lon: number,
    timezone_offset: number
    timezone: string,
}

interface Current extends Base{
    feels_like: number,
    temp: number,
    rain: Rain,
    visibility: number,
}

interface Daily extends Base{
    feels_like: Feels_like,
    temp: Temp,
    rain: number
}

interface Hourly extends Base{
    feels_like: number,
    temp: number,
    visibility: number,
    rain: Rain
}

interface Base {
    clouds: number,
    dew_point?: number,
    dt: number,
    humidity: number,
    pressure: number,
    sunrise?: number,
    sunset?: number
    uvi?: number,
    wind_deg: number
    wind_gust: number
    wind_speed: number,
    weather: Weather[]
}

interface Feels_like{
    day: number,
    eve: number,
    morn: number,
    night: number
}

interface Temp{
    day: number,
    eve: number,    
    max: number,
    min: number,
    morn: number,
    night: number,
}