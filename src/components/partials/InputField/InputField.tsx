import React, { FC } from 'react';
import { InputFieldProps } from '../../../Interfaces/ObjectInterfaces';

export const InputField: FC<InputFieldProps> = ({ label, type, id, name, placeholder, value, onChange, onFocus, onBlur, error }) => {

    return (
        <div>
            <label>{label}</label>
            <input type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}></input>
            {error && <p className='errors'>{error}</p>}
        </div>
    )
}
