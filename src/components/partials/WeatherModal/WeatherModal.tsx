import React, { FC, useState, useEffect, useCallback } from "react";
import { getWeather } from "../../../services/getWeather";
import { WeatherObject } from "../../../Interfaces/ObjectInterfaces";
import { PositionObject } from "../../../TypeFiles/ObjectTypes";
import "./WeatherModal.css";

export const WeatherModal: FC = () => {
    const [weather, setWeather] = useState<WeatherObject>({
        tempMax: "loading",
        tempMin: "loading",
        pressure: "loading",
        humidity: "loading",
    });
    const [location, setLocation] = useState<string | undefined>(undefined);

    function showPosition(positionO: PositionObject): void {
        console.log("showPosition");
        let latitude = positionO.coords.latitude;
        let longitude = positionO.coords.longitude;
        setLocation(`lat=${latitude}&lon=${longitude}`);
    }

    const fetchWeather = useCallback(() => {
        console.log("fetchWeather");
        if (location) {
            getWeather(location).then((weatherObj) => {
                setWeather(weatherObj);
            });
        }
    }, [location]);

    const getLocation = useCallback(() => {
        console.log("getLocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("You must enable geolocation");
        }
    }, []);

    useEffect(() => {
        if (!location) {
            getLocation();
        }
    }, [getLocation, location]);

    useEffect(() => {
        if (location) {
            fetchWeather();
        }
    }, [fetchWeather, location]);

    if (weather) {
        return (
            <div className="weather-modal isHovering">
                <p>Weather today:</p>
                <h5>Max temperature: {weather.tempMax}</h5>
                <h5>Min temperature: {weather.tempMin}</h5>
                <h5>Pressure: {weather.pressure}</h5>
                <h5>Humidity: {weather.humidity}</h5>
            </div>
        );
    }
    return (
        <div className="weather-modal isHovering">
            <p>Unable to get location</p>
        </div>
    );
};
