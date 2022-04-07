import React, { FC } from 'react';
import { InputFieldProps } from '../../../Interfaces/ObjectInterfaces';

export const InputField: FC<InputFieldProps> = ({ label, type, id, name, value, onChange, error }) => {

    return (
        <div>
            <label>{label}</label>
            <input type={type} id={id} name={name} value={value} onChange={onChange}></input>
            {error && <p className='errors'>{error}</p>}
        </div>
    )
}
