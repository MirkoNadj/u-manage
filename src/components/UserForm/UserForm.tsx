import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserForm.css';
import { CompanyInterface, UserInterface, ValidationErrors } from '../../Interfaces/ObjectInterfaces';
import { formValidation } from '../../services/formValidation';
import { guIdGenerator } from '../../services/guidGenerator';

export const UserForm: FC = () => {
    let navigate = useNavigate();
    let fetchedUserList = window.localStorage.getItem("storedUserList");
    let fetchedCompanyList = window.localStorage.getItem("storedCompanyList");
    let fetchedPositionList = window.localStorage.getItem("storedPositionList");

    if (!fetchedUserList) {
        fetchedUserList = '[]';
    };
    const parsedUserList: Array<UserInterface> = JSON.parse(fetchedUserList);

    if (!fetchedCompanyList) {
        fetchedCompanyList = '[]';
    };
    const parsedCompanyList: Array<CompanyInterface> = JSON.parse(fetchedCompanyList);

    if (!fetchedPositionList) {
        fetchedPositionList = '[]';
    };
    const parsedPositionList: string[] = JSON.parse(fetchedPositionList);

    const [userList, updateUserList] = useState(parsedUserList);

    let { currentUserId } = useParams();

    let newOrOldUser: UserInterface = {
        id: '',
        firstName: '',
        lastName: '',
        companyId: '',
        companyName: '',
        dOB: '1990-01-01',
        position: '',
        phoneNumber: '',
    };

    let currentUserFoundByID = parsedUserList.find((userFromList: UserInterface) => userFromList.id === currentUserId);

    if (currentUserFoundByID) {
        newOrOldUser = currentUserFoundByID
    };

    const [userInfo, setUserInfo] = useState<UserInterface>(newOrOldUser);

    const [formErrors, setFormErrors] = useState<ValidationErrors>({ isValid: false });

    const handleChange = (event: ChangeEvent<any>): void => {

        if (event.target.name === 'companyName') {
            setUserInfo({
                ...userInfo,
                [event.target.id]: event.target.value,
                [event.target.name]: event.target.options[event.target.selectedIndex].text,
            }); console.log(event.target.name, event.target.options[event.target.selectedIndex].text);
            console.log(event.target.id, event.target.value)
        };

        if (event.target.name !== 'companyName') {
            setUserInfo({
                ...userInfo,
                [event.target.id]: event.target.value,
            }); console.log(event.target.name, event.target.value)
        }
    }

    useEffect(() => {
        window.localStorage.setItem("storedUserList", JSON.stringify(userList));
    }, [userList]);

    const saveUser = () => {
        setFormErrors(formValidation(userInfo));

        if (formValidation(userInfo).isValid) {

            if (currentUserId) {         // for editing old user
                let userIndex = parsedUserList.findIndex((userFromList: UserInterface) => userFromList.id === currentUserId)
                userList[userIndex] = userInfo;
                window.localStorage.setItem("storedUserList", JSON.stringify(userList));
            }
            else {                      // new user
                userInfo.id = guIdGenerator();
                updateUserList([...userList, userInfo]);
            }
            navigate('/users');
        };
    }

    return (
        <div className='user-form'>
            <h1>User Form</h1>
            <button onClick={saveUser}>Save/Edit</button>
            <form className='form-container'>
                <label>First Name:</label>
                <input type='text' id='firstName' name='firstName' value={userInfo.firstName} onChange={handleChange}></input>
                {formErrors.firstName && <p className='errors'>{formErrors.firstName}</p>}
                <label>Last Name:</label>
                <input type='text' id='lastName' name='lastName' value={userInfo.lastName} onChange={handleChange}></input>
                {formErrors.lastName && <p className='errors'>{formErrors.lastName}</p>}
                <label>Company:</label>
                <select id="companyId" name="companyName" value={userInfo.companyId} onChange={handleChange}>
                    <option value='defaultId'>-Company-</option>
                    {parsedCompanyList.map((companyItem: CompanyInterface) => {
                        return <option value={companyItem.id}>{companyItem.name}</option>
                    })}
                </select>
                {formErrors.companyId && <p className='errors'>{formErrors.companyId}</p>}
                <label>DOB:</label>
                <input type='date' id='dOB' name='dOB' value={userInfo.dOB} onChange={handleChange}></input>
                {formErrors.dOB && <p className='errors'>{formErrors.dOB}</p>}
                <label>Position:</label>
                <select name="position" id="position" value={userInfo.position} onChange={handleChange}>
                    <option value='defaultId'>-Position-</option>
                    {parsedPositionList.map((positionItem: string) => {
                        return <option value={positionItem}>{positionItem}</option>
                    })}
                </select>
                {formErrors.position && <p className='errors'>{formErrors.position}</p>}
                <label>Phone Number:</label>
                <input type='number' id='phoneNumber' name='phoneNumber' value={userInfo.phoneNumber} onChange={handleChange}></input>
                {formErrors.phoneNumber && <p className='errors'>{formErrors.phoneNumber}</p>}
            </form>
        </div>
    )
}