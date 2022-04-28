import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'
import './Companies.css';
import TableCompanies from '../TableCompanies/TableCompanies';

export const Companies: FC = () => {
    let navigate = useNavigate();

    return (
        <div className='companies-page'>
            <div className='companies-table-container'>
                <h1>Companies</h1>
                <button className='addBtn' onClick={() => { navigate('/companies/create/') }}>Add</button>
                <TableCompanies />
            </div>
        </div>
    )
}