import { Position } from '../TypeFiles/ObjectTypes';

export interface WeatherObject {
    tempMax: number | string;
    tempMin: number | string;
    pressure: number | string;
    humidity: number | string;
}

export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    companyId: string;
    companyName: string;
    dOB: string;
    position: string;
    phoneNumber: string;
}

export interface CompanyInterface {
    id: string;
    name: string;
    users: string[];
    city: string;
    country: string;
}

export interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    companyId?: string;
    companyName?: string;
    dOB?: string;
    position?: string;
    phoneNumber?: string;
}