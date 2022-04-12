import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './TableCompanies.css'
import { Company } from '../../Interfaces/ObjectInterfaces';
import { deleteCompanyFromTable, getCompanies } from '../../services/StorageRepository';

export const TableCompanies: FC = () => {

    const [tableList, setTableList] = useState(getCompanies())

    let navigate = useNavigate();

    const deleteItem = (idToDelete: string): void => {
        deleteCompanyFromTable(tableList, idToDelete);
        setTableList(tableList.filter((listItem: Company) => {
            return listItem.id !== idToDelete
        }));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name:</th>
                    <th>City:</th>
                    <th>Country:</th>
                    <th>No. of users:</th>
                </tr>
            </thead>
            <tbody>
                {tableList.map((companyItem: Company) => (
                    <tr>
                        <td>{companyItem.name}</td>
                        <td>{companyItem.city}</td>
                        <td>{companyItem.country}</td>
                        <td>{companyItem.users.length}</td>
                        <td><button className='delEditBtn' onClick={() => { navigate(`/companies/${companyItem.id}`) }}>Edit</button></td>
                        <td><button className='delEditBtn' onClick={() => { deleteItem(companyItem.id) }}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}