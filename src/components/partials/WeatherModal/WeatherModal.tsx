import React, { FC, useState, useEffect, useCallback } from "react";
import { getWeather } from "../../../services/getWeather";
import { WeatherObject } from "../../../Interfaces/ObjectInterfaces";
import { PositionObject } from "../../../TypeFiles/ObjectTypes";
import "./Weather.scss";
import { motion } from 'framer-motion';

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

    const modalVariant = {
        startMotion: {
            x: '100vw',
            opacity: 0,
        },
        endMotion: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.8,
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        }
    }

    const itemVariant = {
        startMotion: {
            x: '100vw',
            opacity: 0
        },
        endMotion: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1,
                bounce: 0.3,
            }
        }
    }



    if (weather) {
        return (
            <motion.div
                className="weather-modal isHovering theme"
                variants={modalVariant}
                initial='startMotion'
                animate='endMotion'
            >
                <motion.p variants={itemVariant}>Weather today:</motion.p>
                <motion.h4 variants={itemVariant}>Max temperature: {weather.tempMax} <sup>o</sup>C</motion.h4>
                <motion.h4 variants={itemVariant}>Min temperature: {weather.tempMin} <sup>o</sup>C</motion.h4>
                <motion.h4 variants={itemVariant}>Pressure: {weather.pressure} mmHg</motion.h4>
                <motion.h4 variants={itemVariant}>Humidity: {weather.humidity} %</motion.h4>
            </motion.div>
        );
    }
    return (
        <motion.div
            className="weather-modal isHovering"
            variants={modalVariant}
            initial='startMotion'
            animate='endMotion'
        >
            <p>Unable to get location</p>
        </motion.div>
    );
};
