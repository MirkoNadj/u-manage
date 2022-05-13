import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './TableCompanies.css'
import { Company } from '../../../Interfaces/ObjectInterfaces';

import { PagingLine } from '../../partials/PagingLine/PagingLine';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const TableCompanies = ({ companiesList, deleteCompany, removeCompanyNameForUsers }: any) => {

    const [pagingStart, setPagingStart] = useState(0);
    const [pagingEnd, setPagingEnd] = useState(companiesList.length);

    const tableList = companiesList.slice(pagingStart, pagingEnd)

    const deleteItem = (companyItem: Company): void => {
        deleteCompany(companyItem);
        removeCompanyNameForUsers(companyItem);
    };

    return (
        <table className='table-users'>
            <thead>
                <tr className='table-header'></tr>
                <tr>
                    <th>Name:</th>
                    <th>City:</th>
                    <th>Country:</th>
                    <th>No. of users:</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableList.map((companyItem: Company) => {
                    return (
                        <tr key={companyItem.id}>
                            <td>{companyItem.name}</td>
                            <td>{companyItem.city}</td>
                            <td>{companyItem.country}</td>
                            <td>{companyItem.users.length}</td>
                            <td className='td-edit'><Link to={`/companies/${companyItem.id}`} state={{
                                currentCompanyId: '',
                                isUserFormModal: true
                            }}><button className='edit-btn' title='Edit'><EditOutlined /></button></Link>
                            </td>
                            <td className='td-del'><button className='del-btn' title='Delete' onClick={() => { deleteItem(companyItem) }}><DeleteOutlined /></button></td>
                        </tr>)
                })}
            </tbody>
            <tfoot>
                <tr><td className='table-pag' colSpan={6}>
                    <PagingLine pagingRange={companiesList.length} setPagingStart={setPagingStart} setPagingEnd={setPagingEnd} />
                </td></tr>
            </tfoot>
        </table>
    )
}

