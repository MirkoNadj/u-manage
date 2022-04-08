import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './TableUsers.css'
import { User } from '../../Interfaces/ObjectInterfaces';
import { getUsers, convertDateString, deleteUserFromTable } from '../../services/StorageRepository';

export const TableUsers: FC = () => {
    let navigate = useNavigate();
    const { currentCompanyId } = useParams();
    const [tableList, setTableList] = useState(getUsers())

    useEffect(() => {
        if (currentCompanyId) {
            setTableList(getUsers().filter(userItem => userItem.companyId === currentCompanyId));
        }
    }, [currentCompanyId]);

    const deleteItem = (userItem: User) => {
        deleteUserFromTable(tableList, userItem)
        setTableList(tableList.filter((listItem: User) => {
            return listItem.id !== userItem.id;
        }));
    };

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
                {tableList.map((userItem: User, key: number) => {
                    return (
                        <tr key={userItem.id}>
                            <td>{`${userItem.firstName} ${userItem.lastName}`}</td>
                            <td>{convertDateString(userItem.dOB)}</td>
                            <td>{userItem.companyName}</td>
                            <td>{userItem.position}</td>
                            <td><button className='delEditBtn' onClick={() => { navigate(`/users/${userItem.id}`) }}>Edit</button></td>
                            <td><button className='delEditBtn' onClick={() => { deleteItem(userItem) }}>Delete</button></td>
                        </tr>)
                })}
            </tbody>
        </table>
    )
}