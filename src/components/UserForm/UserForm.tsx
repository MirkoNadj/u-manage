import React, { FC, useState, ChangeEvent, useEffect, useMemo, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserForm.css';
import { User, ValidationErrors } from '../../Interfaces/ObjectInterfaces';
import { formValidation } from '../../services/formValidation';
import { guIdGenerator } from '../../services/guidGenerator';
import { newUserInfo, getUsers, setUsers, findUserById, updateCompanyUsers, getCompanies, positionsList, editUserById, findCompanyById } from '../../services/StorageRepository';
import { InputField } from '../partials/InputField/InputField';
import { SelectField } from '../partials/SelectField/SelectField';
import { PropsContext } from '../../App';

export const UserForm: FC = () => {
    const { currentCompany } = useContext(PropsContext)
    console.log('render current company ', currentCompany)
    const [userInfo, setUserInfo] = useState<User>(newUserInfo);
    const companiesList = useMemo(() => { return (getCompanies()) }, [])

    let { currentUserId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUserId) {
            setUserInfo(findUserById(currentUserId)!)
        };
    }, [currentUserId])

    const [formErrors, setFormErrors] = useState<ValidationErrors>({ isValid: false });

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        setUserInfo({
            ...userInfo,
            [event.target.id]: event.target.value,
        });
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        setUserInfo({
            ...userInfo,
            [event.target.id]: event.target.value,
        });
    }

    const saveUser = () => {
        if (currentCompany) {
            userInfo.companyId = currentCompany;
        }
        setFormErrors(formValidation(userInfo));
        userInfo.companyName = findCompanyById(userInfo.companyId)!.name;

        if (currentUserId && formValidation(userInfo).isValid) {    // for editing old user
            editUserById(currentUserId, userInfo)
        }
        if (!currentUserId && formValidation(userInfo).isValid) {                     // saving new user
            userInfo.id = guIdGenerator();
            setUsers([...getUsers(), userInfo]);
            //console.log('newUserAdded', userInfo)
        };
        if (formValidation(userInfo).isValid) {
            updateCompanyUsers(userInfo);
            navigate('/users')
        }
    };

    return (
        <div className='user-form'>
            <h1>User Form</h1>
            <button onClick={saveUser}>Save/Edit</button>
            <form className='form-container'>
                <InputField
                    label="First name"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleChangeInput}
                    error={formErrors.firstName}
                />
                <InputField
                    label="Last name"
                    type="text"
                    id="lastName"
                    name="firstName"
                    value={userInfo.lastName}
                    onChange={handleChangeInput}
                    error={formErrors.lastName}
                />
                <SelectField
                    label='Company:'
                    id='companyId'
                    name='companyName'
                    value={currentCompany ? currentCompany : userInfo.companyId}
                    defaultValue={currentCompany ? currentCompany : 'defaultValue'}
                    itemArr={companiesList}
                    onChange={handleChangeSelect}
                    error={formErrors.companyId}
                >
                </SelectField>
                <InputField
                    label="Date Of Birth"
                    type="date"
                    id="dOB"
                    name="dOB"
                    value={userInfo.dOB}
                    onChange={handleChangeInput}
                    error={formErrors.dOB}
                />
                <SelectField
                    label='Position:'
                    id='position'
                    name='position'
                    value={userInfo.position}
                    defaultValue={'defaultId'}
                    itemArr={positionsList}
                    onChange={handleChangeSelect}
                    error={formErrors.position}
                >
                </SelectField>
                <InputField
                    label="Phone Number"
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleChangeInput}
                    error={formErrors.phoneNumber}
                />
            </form>
        </div>
    );
}