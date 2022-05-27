import React, { FC } from "react";
import './Home.scss';


export const Home: FC = () => {
    return (
        <div className="home">
            <img src="./mngLogo-medium.png" alt='LOGO'></img>
            <h6>Welcome to the worlds best management app</h6>
        </div>
    )
}