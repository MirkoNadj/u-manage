import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { WeatherModal } from '../WeatherModal/WeatherModal';
import './HeaderStyles/Header.css';
import { GlobalOutlined, LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export const Header: FC = () => {
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
                className='header'
                variants={headerVariant}
                initial='startMotion'
                animate='endMotion'
            >
                <motion.div
                    className='title'
                    variants={itemVariant}
                >
                    <img className='img' src="./mngLogo.png" alt='LOGO'></img>
                    <Link to='/'><h1>U-manage</h1></Link>
                </motion.div>
                <nav>
                    <ul>
                        <NavLink to='/users'><motion.li variants={itemVariant}>Users</motion.li></NavLink>
                        <NavLink to='/companies'><motion.li variants={itemVariant}>Companies</motion.li></NavLink>
                        <NavLink to='/newsletterPosts'><motion.li variants={itemVariant}>Newsletter</motion.li></NavLink>
                    </ul>
                </nav>
                <motion.button
                    variants={itemVariant}
                    onClick={() => window.open('https://www.metaweather.com')}
                    onMouseOver={() => { setIsWeather(true) }}
                    onMouseOut={() => { setIsWeather(false) }}
                >
                    {isWeather ? <LoadingOutlined spin /> : <GlobalOutlined />}
                </motion.button>
                {isWeather && <WeatherModal />}
            </motion.div>
        </>
    )
}
