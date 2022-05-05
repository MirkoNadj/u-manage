import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { WeatherModal } from '../WeatherModal/WeatherModal';
import './HeaderStyles/Header.css';
import { GlobalOutlined, SyncOutlined } from '@ant-design/icons';

export const Header: FC = () => {
    let [isWeather, setIsWeather] = useState(false);
    return (
        <>
            <div className='header'>
                <div className='title'>
                    <img className='img' src="./mngLogo.png" alt='LOGO'></img>
                    <Link to='/'><h1>U-manage</h1></Link>
                </div>
                <nav>
                    <ul>
                        <NavLink to='/users'><li>Users</li></NavLink>
                        <NavLink to='/companies'><li>Companies</li></NavLink>
                        <NavLink to='/newsletterPosts'><li>Newsletter</li></NavLink>
                    </ul>
                </nav>

                <button onClick={() => window.open('https://www.metaweather.com')} onMouseOver={() => { setIsWeather(true) }} onMouseOut={() => { setIsWeather(false) }}>{isWeather ? <SyncOutlined spin /> : <GlobalOutlined />}</button>
                {isWeather && <WeatherModal />}
            </div>
        </>
    )
}
