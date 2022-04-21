import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'
import './Users.css';
import TableUsers from '../TableUsers/TableUsers';
export const Users: FC = () => {
    let navigate = useNavigate();

    return (
        <div className='users-page'>
            <div className='user-table-container'>
                <h1>Users</h1>
                <button className='addBtn' onClick={() => { navigate('/users/create/') }}>Add</button>
                <TableUsers />
            </div>
        </div>
    )
}