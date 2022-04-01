import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './TableUsers.css'
import { CompanyInterface, UserInterface } from '../../Interfaces/ObjectInterfaces';

export const TableUsers: FC = () => {
    let navigate = useNavigate();
    const { currentCompanyId } = useParams();

    let fetchedUserList = window.localStorage.getItem("storedUserList");
    let fetchedCompanyList = window.localStorage.getItem("storedCompanyList");
    if (!fetchedUserList) {
        fetchedUserList = '[]';
    }

    let parsedUserList: Array<UserInterface> = JSON.parse(fetchedUserList)
    if (!fetchedCompanyList) {
        fetchedCompanyList = '[]';
    }
    let parsedCompanyList: Array<CompanyInterface> = JSON.parse(fetchedCompanyList)

    let nowUserList = parsedUserList;

    if (currentCompanyId) {
        nowUserList = parsedUserList.filter(userItem => userItem.companyId === currentCompanyId);
    }

    const [tableList, setTableList] = useState(nowUserList)

    const deleteItem = (idToDelete: string | undefined): void => {
        let newUserList = parsedUserList.filter(userItem => userItem.id !== idToDelete);
        window.localStorage.setItem("storedUserList", JSON.stringify(newUserList));

        if (currentCompanyId) {
            let newCompanyList = parsedCompanyList.map((companyItem) => {
                if (companyItem.id === currentCompanyId) {
                    companyItem.users = companyItem.users.filter(user => user !== idToDelete)
                    return companyItem;
                }
                else {
                    return companyItem;
                };
            });
            window.localStorage.setItem("storedCompanyList", JSON.stringify(newCompanyList))
        }

        setTableList(nowUserList.filter((listItem: UserInterface) => {
            return listItem.id !== idToDelete
        }));
    };

    const convertDateString = (date: string) => {
        return date.split('-').reverse().join('-');
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Full name:</th>
                    <th>Date Of Birth:</th>
                    <th>Company:</th>
                    <th>Position:</th>
                </tr>
            </thead>
            <tbody>
                {tableList.map((userItem: UserInterface) => (
                    <tr>
                        <td>{`${userItem.firstName} ${userItem.lastName}`}</td>
                        <td>{convertDateString(userItem.dOB)}</td>
                        <td>{userItem.companyName}</td>
                        <td>{userItem.position}</td>
                        <td><button className='delEditBtn' onClick={() => { navigate(`/users/${userItem.id}`) }}>Edit</button></td>
                        <td><button className='delEditBtn' onClick={() => { deleteItem(userItem.id) }}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}