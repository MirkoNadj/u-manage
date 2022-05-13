import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'
import './CompaniesStyles/CompaniesStyles.css';
import { TableCompanies } from '../CompaniesPage/TableCompanies/TableCompanies';
import CompanyFormModal from '../CompaniesPage/CompanyFormModal/CompanyFormModal'
import { deleteCompany } from '../../features/companiesSlice';
import { AppDispatch, RootState } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { Company, LocationProps } from '../../Interfaces/ObjectInterfaces';
import { PlusOutlined } from '@ant-design/icons';

export const Companies = (props: PropsFromRedux) => {


    const [isModal, setIsModall] = useState(false);

    const location = useLocation() as LocationProps;

    useEffect(() => {
        if (location.state) {
            setIsModall(location.state.isUserFormModal)
        }
    }, [location.state]);

    return (
        <div className='companies-page'>
            <Link
                to='/companies/create/'
                state={{
                    currentCompanyId: '',
                    isUserFormModal: true
                }}><button className='addCompanyBtn' title=' Add'><PlusOutlined /></button></Link>
            <div className='c-table-container'>
                <h2>Companies</h2>
                <TableCompanies companiesList={props.companies.companiesList} deleteUser={props.deleteCompany} />
            </div>
            {isModal && <CompanyFormModal setIsModall={setIsModall} />}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Companies);