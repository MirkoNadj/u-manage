import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom'
import './CompanyUsers.css';
import TableUsers from '../TableUsers/TableUsers';

export const CompanyUsers: FC = () => {
    let { currentCompanyId } = useParams();

    return (
        <div className='users-page'>
            <div className='user-table-container'>
                <h1>Company Users:</h1>
                <button className='addBtn'>
                    <Link
                        to='/users/create/'
                        state={currentCompanyId}>Add
                    </Link>
                </button>
                <TableUsers />
            </div>
        </div>
    )
}