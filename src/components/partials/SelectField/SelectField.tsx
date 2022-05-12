import React, { FC } from 'react';
import './SelectField.css';
import { SelectFieldProps } from '../../../Interfaces/ObjectInterfaces';

export const SelectField: FC<SelectFieldProps> = ({ label, id, name, value, defaultValue, itemArr, onChange, onFocus, onBlur, error, isDisabled }) => {

    return (<div>
        <label>{label}</label>
        <select
            id={id}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={isDisabled}
        >
            <option value='defaultId' className='placeholder' >Choose here...</option>
            {itemArr!.map((item) => (
                <option
                    key={item.id}
                    value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
        {error && <p className='errors'>{error}</p>}
    </div>
    )
}