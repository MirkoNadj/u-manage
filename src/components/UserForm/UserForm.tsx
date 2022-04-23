import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './UserForm.css';
import { User, ValidationErrors } from '../../Interfaces/ObjectInterfaces';
import { formValidation } from '../../services/formValidation';
import { guIdGenerator } from '../../services/guidGenerator';
import { newUserInfo, findUserById, updateCompanyUsers, getCompanies, positionsList, findCompanyById } from '../../services/StorageRepository';
import { InputField } from '../partials/InputField/InputField';
import { SelectField } from '../partials/SelectField/SelectField';
import { AppDispatch, RootState } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { addUser, editUser } from '../../features/usersSlice';

export const UserForm = (props: PropsFromRedux) => {
    const [userInfo, setUserInfo] = useState<User>(newUserInfo);
    const companiesList = useMemo(() => { return (getCompanies()) }, [])

    const location = useLocation();
    const currentCompany = location.state as string;

    let { currentUserId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUserId) {
            setUserInfo(findUserById(currentUserId, props.users.value)!)
        };
    }, [currentUserId, props.users.value])

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

        if (currentUserId && formValidation(userInfo).isValid) {
            props.editUser(userInfo)     // for editing old user

        }
        if (!currentUserId && formValidation(userInfo).isValid) {
            userInfo.id = guIdGenerator();    // saving new user
            props.addUser(userInfo)

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

let mapStateToProps = (state: RootState) => {
    return {
        users: state.users
    }
}

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addUser: (user: User) => dispatch(addUser(user)),
        editUser: (user: User) => dispatch(editUser(user))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)