import React, { FC } from 'react';
import './SelectField.css';
import { SelectFieldProps } from '../../../Interfaces/ObjectInterfaces';

export const SelectField: FC<SelectFieldProps> = ({ label, id, name, value, itemArr, onChange, error }) => {

    return (<div>
        <label>{label}</label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}>
            <option value='defaultId'>-Choose:-</option>
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