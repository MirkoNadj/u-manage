import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './TableUsers.css'
import { User } from '../../../Interfaces/ObjectInterfaces';
import { convertDateString } from '../../../services/StorageRepository';
import { PagingLine } from '../../partials/PagingLine/PagingLine';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const TableUsers = ({ usersList, deleteUser, updateCompanyUsers }: any) => {

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
                    <tr className='table-header'></tr>
                    <tr>
                        <th>Full name:</th>
                        <th>Date Of Birth:</th>
                        <th>Company:</th>
                        <th>Position:</th>
                        <th></th>
                        <th></th>
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
                                <td className='td-edit'><Link to={`/users/${userItem.id}`} state={{
                                    currentCompanyId: '',
                                    isUserFormModal: true
                                }}><button className='edit-btn' title='Edit'><EditOutlined /></button></Link>
                                </td>
                                <td className='td-del'>
                                    <button className='del-btn' title='Delete' onClick={() => { deleteItem(userItem) }}><DeleteOutlined /></button>
                                </td>
                            </tr>)
                    })}
                </tbody>
                <tfoot>
                    <tr><td className='table-pag' colSpan={6}>
                        <PagingLine pagingRange={usersList.length} setPagingStart={setPagingStart} setPagingEnd={setPagingEnd} />
                    </td></tr>
                </tfoot>
            </table>

        </>
    )
}
