import React, { FC } from 'react';
import './TextAreaField.css';
import { TextAreaProps } from '../../../Interfaces/ObjectInterfaces';

export const TextAreaField: FC<TextAreaProps> = ({ label, id, name, value, defaultValue, maxLength, onChange }) => {

    return (
        <div className='text-area'>
            <label>{label}</label>
            <textarea id={id} name={name} value={value} defaultValue={defaultValue} maxLength={maxLength} onChange={onChange}></textarea>
        </div>
    )
}




