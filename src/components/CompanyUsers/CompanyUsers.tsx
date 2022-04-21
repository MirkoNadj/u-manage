import React, { FC, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './CompanyUsers.css';
import TableUsers from '../TableUsers/TableUsers';
import { PropsContext } from '../../App';

export const CompanyUsers: FC = () => {
    let navigate = useNavigate();
    const { setCurrentCompany } = useContext(PropsContext);
    let { currentCompanyId } = useParams()

    const AddUserBtn = () => {
        if (currentCompanyId) {
            // currentCompanyId = 'defaultId'

            setCurrentCompany(currentCompanyId)
        }
        navigate('/users/create/')
    }

    return (
        <div className='users-page'>
            <div className='user-table-container'>
                <h1>Company Users:</h1>
                <button className='addBtn' onClick={AddUserBtn}>Add</button>
                <TableUsers />
            </div>
        </div>
    )
}