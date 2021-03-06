import React, { useState } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { WeatherModal } from '../WeatherModal/WeatherModal';
import './Header.scss';
import { CloudSyncOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../../../Interfaces/ObjectInterfaces';

export const Header = ({ theme, setTheme }: Theme) => {
    let [isWeather, setIsWeather] = useState(false);

    const headerVariant = {
        startMotion: {
            y: -65,
            opacity: 0
        },
        endMotion: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.8,
                when: 'beforeChildren',
                staggerChildren: 0.3
            }
        }
    }

    const itemVariant = {
        startMotion: {
            x: '-10vw',
            opacity: 0
        },
        endMotion: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1.8,
                bounce: 0.3,
            }
        }
    }
    return (
        <>
            <motion.div
                className='header theme'
                variants={headerVariant}
                initial='startMotion'
                animate='endMotion'
            >
                <motion.div
                    className='header-title'
                    variants={itemVariant}
                >
                    <img src="./mngLogo-small.png" alt='LOGO'></img>
                    <Link to='/'><h1 id='h'>U-manage</h1></Link>

                </motion.div>
                <nav>
                    <ul>
                        <NavLink to='/users'><motion.li variants={itemVariant}>Users</motion.li></NavLink>
                        <NavLink to='/companies'><motion.li variants={itemVariant}>Companies</motion.li></NavLink>
                        <NavLink to='/newsletterPosts'><motion.li variants={itemVariant}>Newsletter</motion.li></NavLink>
                    </ul>
                </nav>
                <motion.div className='header-btns'
                    variants={itemVariant}
                >
                    <button className='theme-btn weather-btn-theme' onClick={() => { setTheme(!theme) }}>{theme ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}</button>
                    <button className='weather-btn weather-btn-theme'
                        onClick={() => window.open('https://www.weather-forecast.com/')}
                        onMouseOver={() => { setIsWeather(true) }}
                        onMouseOut={() => { setIsWeather(false) }}
                    >
                        <CloudSyncOutlined />
                    </button>
                </motion.div>
                {isWeather && <WeatherModal />}
            </motion.div>
        </>
    )
}
