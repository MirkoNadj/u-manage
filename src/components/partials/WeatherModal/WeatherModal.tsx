import React, {FC, useState, useEffect} from "react";
import { getWeather } from "../../../services/getWeather";
import { weatherObject } from "../../../Interfaces/ObjectInterfaces";
import './WeatherModal.css';

export const WeatherModal: FC = () => {
    
    const [weather, setWeather] = useState<weatherObject>({tempMax: 'loading', tempMin: 'loading', pressure: 'loading', humidity: 'loading'})
    const [location, setLocation] = useState<string>('')

    type positionObject = {
        coords: {latitude: number, longitude: number}
    }
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert('You must enable geolocation')
        }
    }   
    
    function showPosition (positionO:positionObject):void {
        let latitude = positionO.coords.latitude;
        let longitude = positionO.coords.longitude;
        setLocation(`lat=${latitude}&lon=${longitude}`)
    }

    getLocation();
    
    if (location === '') {
        return (
            <div className="weather-modal isHovering">
                <p>Unable to get location</p>           
            </div>
        )
    }
    else {
        getWeather(location).then(weatherObj => {setWeather(weatherObj)});

        return (
            <div className="weather-modal isHovering">
                <p>Weather today:</p>
                <h5>Max temperature: {weather.tempMax}</h5>
                <h5>Min temperature: {weather.tempMin}</h5>
                <h5>Pressure: {weather.pressure}</h5>
                <h5>Humidity: {weather.humidity}</h5>
            </div>
        )
    }
}