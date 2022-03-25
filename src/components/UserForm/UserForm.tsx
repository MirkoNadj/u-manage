import React, { FC, useState } from 'react';
import { CompanyInterface, UserInterface, ValidationErrors } from '../../Interfaces/ObjectInterfaces';
import { formValidation } from '../../services/formValidation';


export const UserForm: FC = () => {
    let fetchedUserList = window.localStorage.getItem("storedUserList");
    let fetchedCompanyList = window.localStorage.getItem("storedCompanyList");
    let fetchedPositionList = window.localStorage.getItem("storedPositionList");
    // console.log('users', fetchedUserList)
    // console.log('companies', fetchedCompanyList)
    // console.log('positions', fetchedPositionList)

    if (!fetchedUserList) {
        fetchedUserList = '';
    }
    const parsedUserList = JSON.parse(fetchedUserList)

    if (!fetchedCompanyList) {
        fetchedCompanyList = '';
    }
    const parsedCompanyList = JSON.parse(fetchedCompanyList)
    //console.log(parsedCompanyList)

    if (!fetchedPositionList) {
        fetchedPositionList = '';
    }
    const parsedPositionList = JSON.parse(fetchedPositionList)

    const [userInfo, setUserInfo] = useState<UserInterface>({
        id: '',
        firstName: '',
        lastName: '',
        companyId: '',
        companyName: '',
        dOB: '',
        position: '',
        phoneNumber: '',
    })

    const handleChange = (event: any) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.userInfo,
        }
        )
    }
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});

    const [userList, updateUserList] = useState(parsedUserList);

    const [companyList, updateCompanyList] = useState(parsedCompanyList);    // no need for useState??
    const [positionList, updatePositionList] = useState(parsedPositionList);  // no need for useState??   

    const saveUser = () => {
        setFormErrors(formValidation(userInfo))
        // validation checking
        // if ((firstName || lastName || company || dOb || position || phoneNumber) === ('')) {
        //     setValidationMsg('All fields must be filled');
        // }
        // else if (Date.parse(dOb) >= (new Date().getTime())) {
        //     setValidationMsg('Birthdate is not valid');
        // }
        // else if (phoneNumber.length !== 9) {
        //     setValidationMsg('Phone number must be 9 digits long');
        // }

        //const newUser = { firstName, lastName, company, dOb, position, phoneNumber }
        updateUserList([...userList, userInfo])
        console.log(userInfo)
        window.localStorage.setItem("storedUserList", JSON.stringify(userList))

    }

    return (
        <div className='user-form'>
            <h1>User Form</h1>
            <button onClick={saveUser}>Save/Edit</button>
            <div className='form-container'>
                <label>First Name:</label>
                <input type='text' id='firstName' name='firstName' value={userInfo.firstName} onChange={handleChange}></input>
                {formErrors.firstName && <p className='"errors'>{formErrors.firstName}</p>}
                <label>Last Name:</label>
                <input type='text' id='lastName' name='lastName' value={userInfo.lastName} onChange={handleChange}></input>
                {formErrors.lastName && <p className='"errors'>{formErrors.lastName}</p>}
                <label>Company:</label>
                <select id="companyId" name="companyId" value={userInfo.companyId} onChange={handleChange}>
                    {companyList.map((companyItem: CompanyInterface, key: string = companyItem.id) => {
                        return <option value={companyItem.id}>{companyItem.name}</option>
                    })}
                </select>
                {formErrors.companyId && <p className='"errors'>{formErrors.companyId}</p>}
                <label>DOB:</label>
                <input type='date' id='dOB' name='dOB' value={userInfo.dOB} onChange={handleChange}></input>
                {formErrors.dOB && <p className='"errors'>{formErrors.dOB}</p>}
                <label>Position:</label>
                <select name="position" id="position" value={userInfo.position} onChange={handleChange}>
                    {positionList.map((positionItem: string) => {
                        return <option value={positionItem}>{positionItem}</option>
                    })}
                </select>
                {formErrors.position && <p className='"errors'>{formErrors.position}</p>}
                <label>Phone Number:</label>
                <input type='text' id='phoneNumber' name='phoneNumber' value={userInfo.phoneNumber} onChange={handleChange}></input>
                {formErrors.phoneNumber && <p className='"errors'>{formErrors.phoneNumber}</p>}
            </div>
        </div>
    )
}