import { ChangeEventHandler } from "react";


export interface WeatherObject {
    tempMax: number | string;
    tempMin: number | string;
    pressure: number | string;
    humidity: number | string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    companyId: string;
    companyName: string;
    dOB: string;
    position: string;
    phoneNumber: string | number;
}

export interface Company {
    id: string;
    name: string;
    users: string[];
    city: string;
    country: string;
}

export interface ValidationErrors {
    isValid?: boolean;
    firstName?: string;
    lastName?: string;
    companyId?: string;
    companyName?: string;
    dOB?: string;
    position?: string;
    phoneNumber?: string | number;
}

export interface InputFieldProps {
    formErrors: ValidationErrors,
    userInfo: User,
    handleChangeInput: ChangeEventHandler,
}