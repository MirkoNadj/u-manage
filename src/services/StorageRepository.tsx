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

export function formatDateForTable(date: string) {
    let formated = date.slice(4, 6) + ' ' + date.slice(0, 3) + ' ' + date.slice(7, 11);
    return formated;
}

export let newUserInfo: User = {
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