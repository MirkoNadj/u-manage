import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './TableCompanies.css'
import { Company } from '../../Interfaces/ObjectInterfaces';
import { deleteCompany } from '../../features/companiesSlice';
import { AppDispatch, RootState } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';

export const TableCompanies = (props: PropsFromRedux) => {
    const [tableList, setTableList] = useState(props.companies.companiesList)
    let navigate = useNavigate();

    useEffect(() => {
        setTableList(props.companies.companiesList)
    }, [props.companies.companiesList])

    const deleteItem = (companyItem: Company): void => {
        props.deleteCompany(companyItem)
    }

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
                        <td><button className='delEditBtn' onClick={() => { deleteItem(companyItem) }}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

let mapStateToProps = (state: RootState) => {
    return {
        companies: state.companies
    }
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        deleteCompany: (company: Company) => dispatch(deleteCompany(company))
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(TableCompanies);