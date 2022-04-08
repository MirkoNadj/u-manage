import { ChangeEventHandler } from "react";

export interface WeatherObject {
    tempMax: number | string;
    tempMin: number | string;
    pressure: number | string;
    humidity: number | string;
}

export type User = Required<Omit<ValidationErrors, 'isValid'>>

export interface ValidationErrors {
    id?: string;
    isValid?: boolean;
    firstName?: string;
    lastName?: string;
    companyId?: string;
    companyName?: string;
    dOB?: string;
    position?: string;
    phoneNumber?: string | number;
}

export type Company = Required<Omit<CompanyValidationErrors, 'isValid'>>

export interface CompanyValidationErrors {
    id?: string;
    users?: string[];
    isValid: boolean;
    name?: string;
    city?: string;
    country?: string;
}

export interface InputFieldProps {
    label: string,
    type: string;
    id: string;
    name: string;
    value: string | number | readonly string[] | undefined,
    onChange: ChangeEventHandler,
    error: string | number | undefined;
}

export interface SelectFieldProps {
    label: string,
    id: string;
    name: string;
    value: string;
    defaultValue: string;
    itemArr: { id: string, name?: string }[];
    onChange: ChangeEventHandler,
    error: string | number | undefined;
}

