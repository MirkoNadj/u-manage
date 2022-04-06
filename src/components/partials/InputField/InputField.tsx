import React, { FC } from 'react';
import { InputFieldProps } from '../../../Interfaces/ObjectInterfaces';

export const InputField: FC<InputFieldProps> = ({ formErrors, userInfo, handleChangeInput }) => {

    return (
        <div>
            <label>First Name:</label>
            <input type='text' id='firstName' name='firstName' value={userInfo.firstName} onChange={handleChangeInput}></input>
            {formErrors.firstName && <p className='errors'>{formErrors.firstName}</p>}
        </div>
    )
}
