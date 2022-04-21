import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './TableUsers.css'
import { User } from '../../Interfaces/ObjectInterfaces';
import { getUsers, convertDateString, deleteUserFromTable } from '../../services/StorageRepository';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const TableUsers: FC = () => {
    let navigate = useNavigate();
    const { currentCompanyId } = useParams();
    const users = useSelector((state: RootState) => state.users.value);
    const [tableList, setTableList] = useState(users)

    useEffect(() => {
        if (currentCompanyId) {
            setTableList(users.filter(userItem => userItem.companyId === currentCompanyId));
        }
    }, [currentCompanyId, users]);

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