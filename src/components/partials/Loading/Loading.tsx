import React, { FC } from "react";
import './Loading.scss';
import { SpinnerCircularFixed } from 'spinners-react';

export const Loading: FC = () => {
    return (
        <div className="loading">
            <SpinnerCircularFixed size={90} thickness={135} speed={100} color="rgba(57, 105, 172, 1)" secondaryColor="rgba(57, 62, 172, 1)" />
        </div>
    )
}