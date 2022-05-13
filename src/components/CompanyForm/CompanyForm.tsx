import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CompanyForm.css';
import { Company, CompanyValidationErrors } from '../../Interfaces/ObjectInterfaces';
import { companyFormValidation } from '../../services/formValidation';
import { guIdGenerator } from '../../services/guidGenerator';
import CompanyUsers from '../CompaniesPage/CompanyUsers/CompanyUsers';
import { InputField } from '../partials/InputField/InputField';
import { findCompanyById, newCompanyInfo } from '../../services/StorageRepository';
import { AppDispatch, RootState } from '../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { addCompany, editCompany } from '../../features/companiesSlice';
import { updateCompanyNameForUsers } from '../../features/usersSlice';

export const CompanyForm = (props: PropsFromRedux) => {
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

    return (
        <>
            <div className='company-form'>
                <h1>Company Form</h1>
                <button onClick={saveCompany}>Save/Edit</button>
                <form className='form-container'>
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
                </form>
            </div>
            {(currentCompanyId) && <CompanyUsers />}
        </>
    )
};

let mapStateToProps = (state: RootState) => {
    return {
        companies: state.companies
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);