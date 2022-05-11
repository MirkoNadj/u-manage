import { User, Company } from '../Interfaces/ObjectInterfaces';

export function findUserById(currentUserId: string, userList: User[]) {
    let currentUserFoundByID = userList.find((userFromList: User) => userFromList.id === currentUserId);
    return currentUserFoundByID;
}

export function findCompanyById(currentCompanyId: string, companiesList: Company[]) {
    let currentCompanyFoundByID = companiesList.find((companyFromList: Company) => companyFromList.id === currentCompanyId);
    return currentCompanyFoundByID;
}

export function convertDateString(date: string = '1990-01-01') {
    return date.split('-').reverse().join('-');
}

export const newUserInfo: User = {
    id: '',
    firstName: '',
    lastName: '',
    companyId: '',
    companyName: '',
    dOB: '',
    position: '',
    phoneNumber: '',
};

export const newCompanyInfo: Company = {
    id: '',
    name: '',
    users: [],
    city: '',
    country: '',
};

export const positionsList = [
    {
        id: 'Manager',
        name: 'Manager'
    },
    {
        id: 'Software Developer',
        name: 'Software Developer'
    },
    {
        id: 'QA engineer',
        name: 'QA engineer'
    },
    {
        id: 'Staff',
        name: 'Staff'
    }
]