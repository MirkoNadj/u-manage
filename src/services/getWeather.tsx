import { weatherObject } from "../Interfaces/ObjectInterfaces";

export function getWeather(position: string) {
       
    const weatherObj: weatherObject = {
        tempMax: '',
        tempMin: '',
        pressure: '',
        humidity: '',
    }

    return fetch(`https://api.openweathermap.org/data/2.5/weather?${position}&units=metric&appid=ea46a9ffca9adcfb60e279646d104d71`, {
        method: "GET"
    })
    .then((response) => {
        if (!response.ok) {
            let error = new Error('HTTP status code' + response.status);
            throw error;
        }
        return response.json();
    })
    .then((weatherData) => {
        weatherObj.tempMax = weatherData.main.temp_max
        weatherObj.tempMin = weatherData.main.temp_min
        weatherObj.pressure = weatherData.main.pressure
        weatherObj.humidity = weatherData.main.humidity
        return weatherObj;
    })
}