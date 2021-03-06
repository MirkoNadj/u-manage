import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { DatePickerProps } from "antd/lib/date-picker";
import { Params } from 'react-router-dom';

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
    placeholder?: string;
    value: string | number | readonly string[] | undefined,
    onChange: ChangeEventHandler,
    onFocus?: any;
    onBlur?: any;
    error: string | number | undefined;
}

export interface Post {
    body: string;
    id: number;
    title: string;
    userId?: number;
}

export interface FetchError {
    statusCode: number;
    message: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface CommentCardInt {
    commentItem: Comment;
}

export interface CommentInt {
    postDetailsId: string | undefined;
}

export interface PostTitleBodyInt extends CommentInt { }

export interface CommentModalInt {
    commentItem: Comment;
    setIsModal: Dispatch<SetStateAction<boolean>>;
}

export interface TextAreaProps {
    label: string;
    id: string;
    name: string,
    value: string,
    defaultValue: string,
    maxLength: number,
    onChange: ChangeEventHandler;
}

export interface OwnPropsId {
    postDetailsId: string | undefined
}

export interface LocationProps {
    state: {
        currentCompanyId: string;
        isUserFormModal: boolean;
    }
}

export interface OwnProps {
    setIsModal: Dispatch<SetStateAction<boolean>>;
}

export interface TableCompanies {
    companiesList: Company[];
    deleteCompany: (companyItem: Company) => void;
    removeCompanyNameForUsers: (companyItem: Company) => void;
}

export interface TableUsers {
    usersList: User[];
    deleteUser: (userItem: User) => void;
    updateCompanyUsers: (userItem: User) => void;
    title: string;
}

export interface CompanyData extends Omit<Company, 'users'> {
    numOfUsers: number;
}

export interface UserData {
    id: string;
    fullName: string;
    dOB: string;
    companyName: string;
    position: string;
}

export interface Paging {
    pagingRange: number;
    setPagingStart: Dispatch<SetStateAction<number>>;
    setPagingEnd: Dispatch<SetStateAction<number>>;
}

type ExtractPickProps<T extends DatePickerProps["picker"]> = Extract<
    DatePickerProps,
    { picker: T }
>;
export type PickerDate = ExtractPickProps<"date">;

export interface Theme {
    theme: boolean;
    setTheme: Dispatch<SetStateAction<boolean>>
}


