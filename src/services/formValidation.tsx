import { User, ValidationErrors } from "../Interfaces/ObjectInterfaces";

export const formValidation = (userInfo: User) => {
    let formErrors: ValidationErrors = {};
    formErrors.isValid = true;

    if (!userInfo.firstName) {
        formErrors.firstName = "First name is required";
        formErrors.isValid = false;
    }
    if (!userInfo.lastName) {
        formErrors.lastName = "Last name is required";
        formErrors.isValid = false;
    }
    if (!userInfo.companyId) {
        formErrors.companyId = "Company name required";
        formErrors.isValid = false;
    }
    if (!userInfo.dOB) {
        formErrors.dOB = "Date of birth is required";
        formErrors.isValid = false;
    }
    if (Date.parse(userInfo.dOB) >= Date.now()) {
        formErrors.dOB = "Date of birth is not valid";
        formErrors.isValid = false;
    }
    if (!userInfo.position) {
        formErrors.position = "Position is required";
        formErrors.isValid = false;
    }
    if (!userInfo.phoneNumber) {
        formErrors.phoneNumber = "Phone number is required"
        formErrors.isValid = false;
    }
    if (userInfo.phoneNumber.toString().length !== 9) {
        formErrors.phoneNumber = "Phone number must have 9 digits"
        formErrors.isValid = false;
    }
    return formErrors;
}