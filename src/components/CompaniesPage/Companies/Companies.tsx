import React, { useState, useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom'
import './Companies.scss';
import { TableCompaniesAnt } from '../TableCompaniesAnt/TableCompaniesAnt';
import { deleteCompany } from '../../../features/companiesSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { Company, LocationProps } from '../../../Interfaces/ObjectInterfaces';
import { PlusOutlined } from '@ant-design/icons';
import { removeCompanyNameForUsers } from '../../../features/usersSlice';
import { Button } from 'antd';

export const Companies = (props: PropsFromRedux) => {

    const [isModal, setIsModal] = useState(false);
    const location = useLocation() as LocationProps;

    useEffect(() => {
        if (location.state) {
            setIsModal(location.state.isUserFormModal)
        }
    }, [location.state]);

    return (
        <div className='co-page'>
            <div className='toolbar'>

                <Link
                    to='/companies/create/'
                    state={{
                        currentCompanyId: '',
                        isUserFormModal: true
                    }}>
                    <Button type="primary" size='large' title='Add New Company'><
                        PlusOutlined />
                    </Button>
                </Link>

            </div>
            <TableCompaniesAnt companiesList={props.companies.companiesList} deleteCompany={props.deleteCompany} removeCompanyNameForUsers={props.removeCompanyNameForUsers} />
            {isModal && <Outlet context={{ setIsModal }} />}
        </div>
    );
};

let mapStateToProps = (state: RootState) => {
    return {
        companies: state.companies
    };
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        deleteCompany: (company: Company) => dispatch(deleteCompany(company)),
        removeCompanyNameForUsers: (company: Company) => dispatch(removeCompanyNameForUsers(company))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(Companies);