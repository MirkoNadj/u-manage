import { UserInterface, ValidationErrors } from "../Interfaces/ObjectInterfaces";

export const formValidation = (userInfo: UserInterface) => {
    let formErrors: ValidationErrors = {};

    if (!userInfo.firstName) {
        formErrors.firstName = "First name is required";
    }
    if (!userInfo.lastName) {
        formErrors.lastName = "Last name is required";
    }
    if (!userInfo.companyId) {
        formErrors.companyId = "Company name required";
    }
    if (!userInfo.dOB) {
        formErrors.dOB = "Date of birth is required";
    }
    if (!userInfo.position) {
        formErrors.position = "Position is required";
    }
    if (!userInfo.phoneNumber) {
        formErrors.phoneNumber = "Phone number is required"
    }
    return formErrors;
}