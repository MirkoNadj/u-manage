import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './TableUsers.css'
import { User } from '../../Interfaces/ObjectInterfaces';
import { convertDateString } from '../../services/StorageRepository';
import { PagingLine } from '../partials/PagingLine/PagingLine';

export const TableUsers = ({ usersList, deleteUser, updateCompanyUsers }: any) => {
    let navigate = useNavigate();

    const [pagingStart, setPagingStart] = useState(0);
    const [pagingEnd, setPagingEnd] = useState(usersList.length);

    const tableList = usersList.slice(pagingStart, pagingEnd)

    const deleteItem = (userItem: User) => {
        deleteUser(userItem);
        updateCompanyUsers(userItem);
    };

    return (
        <>
            <table className='table-users'>
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
            <PagingLine pagingRange={usersList.length} setPagingStart={setPagingStart} setPagingEnd={setPagingEnd} />
        </>
    )
}
