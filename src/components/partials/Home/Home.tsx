import React, { FC } from "react";
import './Home.css';


export const Home: FC = () => {
    return (
        <div className="home">
            <img src="./mngLogo.png" alt='LOGO'></img>
            <h1>Welcome to the worlds best management app</h1>
        </div>
    )
}