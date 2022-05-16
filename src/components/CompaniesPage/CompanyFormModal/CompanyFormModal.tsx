import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../UsersPage/UserFormModal/UserCoFormModalStyles/UserCoFormModal.css';
import { Company, CompanyValidationErrors } from '../../../Interfaces/ObjectInterfaces';
import { companyFormValidation } from '../../../services/formValidation';
import { guIdGenerator } from '../../../services/guidGenerator';
import CompanyUsers from '../CompanyUsers/CompanyUsers';
import { InputField } from '../../partials/InputField/InputField';
import { findCompanyById, newCompanyInfo } from '../../../services/StorageRepository';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { addCompany, editCompany } from '../../../features/companiesSlice';
import { updateCompanyNameForUsers } from '../../../features/usersSlice';
import { CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export const CompanyFormModal = (props: PropsFromRedux) => {
    const [companyInfo, setCompanyInfo] = useState<Company>(newCompanyInfo);
    const [companyFormErrors, setCompanyFormErrors] = useState<CompanyValidationErrors>({ isValid: false });

    let navigate = useNavigate();
    let { currentCompanyId } = useParams();

    useEffect(() => {
        if (currentCompanyId) {
            setCompanyInfo(findCompanyById(currentCompanyId, props.companies.companiesList)!)
        };
    }, [currentCompanyId, props.companies.companiesList])

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        setCompanyInfo({
            ...companyInfo,
            [event.target.id]: event.target.value,
        });
    }

    const saveCompany = () => {
        setCompanyFormErrors(companyFormValidation(companyInfo));

        if (companyFormValidation(companyInfo).isValid) {
            if (currentCompanyId) {                       // editing old company
                companyInfo.id = currentCompanyId;
                props.editCompany(companyInfo);
                props.updateCompanyNameForUsers(companyInfo)
                return;
            };                                           // new company
            companyInfo.id = guIdGenerator();
            props.addCompany(companyInfo)
            navigate(`/companies/${companyInfo.id}`)

        };
    };

    const cancelCompany = () => {
        props.setIsModall(false);
        currentCompanyId ? navigate(`/companies/${currentCompanyId}`) : navigate('/companies/');
    }

    const modalDropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: '100vh',
            opacity: 0,
        }
    }

    return (
        <>
            <motion.div className='user-co-form-backdrop backdrop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.form className='user-co-form-container theme'
                    variants={modalDropIn}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >

                    <div className='form-title'>
                        <h1 onClick={cancelCompany}><CloseOutlined /></h1>
                        <label>{(!companyInfo.id) ? 'Create New Company' : 'Edit Company Info'}</label>
                    </div>
                    <div className='form-body form-body-theme'>
                        <InputField
                            label="Company Name:"
                            type="text"
                            id="name"
                            name="name"
                            value={companyInfo.name}
                            onChange={handleChangeInput}
                            error={companyFormErrors.name}
                        />
                        <InputField
                            label="City:"
                            type="text"
                            id="city"
                            name="city"
                            value={companyInfo.city}
                            onChange={handleChangeInput}
                            error={companyFormErrors.city}
                        />
                        <InputField
                            label="Country:"
                            type="text"
                            id="country"
                            name="country"
                            value={companyInfo.country}
                            onChange={handleChangeInput}
                            error={companyFormErrors.country}
                        />
                    </div>
                    <div className='form-footer'>
                        <button className='cancel-btn' type='button' onClick={cancelCompany}>Cancel</button>
                        <button className='save-btn' type='button' onClick={saveCompany}>Save</button>
                    </div>
                </motion.form>
                {(currentCompanyId) && <CompanyUsers />}
            </motion.div>
        </>
    )
};

let mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        companies: state.companies,
        setIsModall: ownProps.setIsModall
    };
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addCompany: (company: Company) => dispatch(addCompany(company)),
        editCompany: (company: Company) => dispatch(editCompany(company)),
        updateCompanyNameForUsers: (company: Company) => dispatch(updateCompanyNameForUsers(company))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFormModal);