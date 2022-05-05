import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { WeatherModal } from '../WeatherModal/WeatherModal';
import './HeaderStyles/Header.css';

export const Header: FC = () => {
    let [isWeather, setIsWeather] = useState(false);
    return (
        <>
            <div className='header'>
                <h1> <Link to='/' className='link'>U-manage</Link></h1>
                <nav>
                    <ul>
                        <NavLink to='/users'><li>Users</li></NavLink>
                        <NavLink to='/companies'><li>Companies</li></NavLink>
                        <NavLink to='/newsletterPosts'><li>Newsletter</li></NavLink>
                    </ul>
                </nav>
                <button onClick={() => window.open('https://www.metaweather.com')} onMouseOver={() => { setIsWeather(true) }} onMouseOut={() => { setIsWeather(false) }}>Weather</button>
                {isWeather && <WeatherModal />}
            </div>
        </>
    )
}
