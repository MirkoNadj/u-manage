import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CompanyForm.css';
import { Company, CompanyValidationErrors } from '../../Interfaces/ObjectInterfaces';
import { companyFormValidation } from '../../services/formValidation';
import { guIdGenerator } from '../../services/guidGenerator';
import { CompanyUsers } from '../CompanyUsers/CompanyUsers';
import { InputField } from '../partials/InputField/InputField';
import { getCompanies, findCompanyById, newCompanyInfo, editCompanyById } from '../../services/StorageRepository';

export const CompanyForm: FC = () => {
    console.log('render company form')
    const [companyInfo, setCompanyInfo] = useState<Company>(newCompanyInfo);

    let navigate = useNavigate();
    let { currentCompanyId } = useParams();
    let newCompanyList = getCompanies();
    useEffect(() => {
        if (currentCompanyId) {
            setCompanyInfo(findCompanyById(currentCompanyId)!)
        };
    }, [currentCompanyId])

    //const [companyList, updateCompanyList] = useState(getCompanies());

    const [companyFormErrors, setCompanyFormErrors] = useState<CompanyValidationErrors>({ isValid: false });

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        setCompanyInfo({
            ...companyInfo,
            [event.target.id]: event.target.value,
        });
    }

    // useEffect(() => {
    //     window.localStorage.setItem("storedCompanyList", JSON.stringify(companyList));
    // }, [companyList]);

    const saveCompany = () => {
        setCompanyFormErrors(companyFormValidation(companyInfo));

        if (companyFormValidation(companyInfo).isValid) {

            if (currentCompanyId) {     // editing old company
                editCompanyById(currentCompanyId, companyInfo, getCompanies());
            }
            if (!currentCompanyId) {                      // new company
                companyInfo.id = guIdGenerator();

                newCompanyList[newCompanyList.length] = companyInfo; console.log('save', companyInfo, newCompanyList)
                window.localStorage.setItem("storedCompanyList", JSON.stringify(newCompanyList));
                navigate(`/companies/${companyInfo.id}`)
            }
        };
    }

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
}