import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'
import '../../UsersPage/Users/UsersStyles/Users.css'
import { TableCompanies } from '../TableCompanies/TableCompanies';
import CompanyFormModal from '../CompanyFormModal/CompanyFormModal'
import { deleteCompany } from '../../../features/companiesSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { Company, LocationProps } from '../../../Interfaces/ObjectInterfaces';
import { PlusOutlined } from '@ant-design/icons';
import { removeCompanyNameForUsers } from '../../../features/usersSlice';

export const Companies = (props: PropsFromRedux) => {

    const [isModal, setIsModall] = useState(false);

    const location = useLocation() as LocationProps;

    useEffect(() => {
        if (location.state) {
            setIsModall(location.state.isUserFormModal)
        }
    }, [location.state]);

    return (
        <div className='users-co-page'>
            <div className='toolbar'>
                <h2>Companies</h2>
                <Link
                    to='/companies/create/'
                    state={{
                        currentCompanyId: '',
                        isUserFormModal: true
                    }}>
                    <button className='addUserCoBtn' title='Add New Company'><PlusOutlined /></button>
                </Link>
            </div>
            <TableCompanies companiesList={props.companies.companiesList} deleteCompany={props.deleteCompany} removeCompanyNameForUsers={props.removeCompanyNameForUsers} />
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
        deleteCompany: (company: Company) => dispatch(deleteCompany(company)),
        removeCompanyNameForUsers: (company: Company) => dispatch(removeCompanyNameForUsers(company))
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(Companies);