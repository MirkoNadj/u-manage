import { User, Company } from "../Interfaces/ObjectInterfaces";

export let storedUserList: User[] = [
    {
        id: 'u1',
        firstName: 'John',
        lastName: 'Smith',
        companyId: 'c4',
        companyName: 'Microsoft',
        dOB: '1998-01-15',
        position: 'Software Developer',
        phoneNumber: '012345678',
    },
    {
        id: 'u2',
        firstName: 'Jane',
        lastName: 'Doe',
        companyId: 'c5',
        companyName: 'IBM',
        dOB: '2000-06-20',
        position: 'Manager',
        phoneNumber: '656456577',
    },
    {
        id: 'u3',
        firstName: 'Marry',
        lastName: 'Sing',
        companyId: 'c6',
        companyName: 'Apple',
        dOB: '1980-02-10',
        position: 'QA engineer',
        phoneNumber: '012345677',
    }
];

export let storedCompanyList: Company[] = [
    {
        id: 'c4',
        name: 'Microsoft',
        users: ['u1'],
        city: 'San Francisco',
        country: 'USA'
    },
    {
        id: 'c5',
        name: 'IBM',
        users: ['u2'],
        city: 'New York',
        country: 'USA'
    },
    {
        id: 'c6',
        name: 'Apple',
        users: ['u3'],
        city: 'LA',
        country: 'USA'
    }
];

window.localStorage.setItem('storedUserList', JSON.stringify(storedUserList));
window.localStorage.setItem('storedCompanyList', JSON.stringify(storedCompanyList));