import { User, Company } from '../Interfaces/ObjectInterfaces';

export function getUsers() {
    let fetchedUserList = window.localStorage.getItem("storedUserList");
    if (!fetchedUserList) {
        fetchedUserList = '[]';
    };
    let parsedUserList: Array<User> = JSON.parse(fetchedUserList);
    console.log('getUsersFunction', parsedUserList)
    return parsedUserList;
}

export function findUserById(currentUserId: string) {
    let parsedUserList = getUsers()
    let currentUserFoundByID = parsedUserList.find((userFromList: User) => userFromList.id === currentUserId);
    console.log('findUserByIdFunction', currentUserFoundByID)
    return currentUserFoundByID;
}

export function editUserById(currentUserId: string, userInfo: User) {
    let parsedUserList = getUsers()
    let userIndex = parsedUserList.findIndex((userFromList: User) => userFromList.id === currentUserId);
    parsedUserList[userIndex] = userInfo;
    window.localStorage.setItem("storedUserList", JSON.stringify(parsedUserList));
}

export function setUsers(userList: User[]) {
    console.log('setUsersFunction', userList)
    window.localStorage.setItem("storedUserList", JSON.stringify(userList));
}

export function getCompanies() {
    let fetchedCompanyList = window.localStorage.getItem("storedCompanyList");
    if (!fetchedCompanyList) {
        fetchedCompanyList = '[]';
    };
    const parsedCompanyList: Array<Company> = JSON.parse(fetchedCompanyList);
    console.log('getCompaniesFunction', parsedCompanyList)
    return parsedCompanyList;
}

export function updateCompanyUsers(userInfo: User) {
    let newCompanyList = getCompanies().map((companyItem) => {
        if (companyItem.id === userInfo.companyId) {
            companyItem.users = companyItem.users.filter(user => user !== userInfo.id)
            companyItem.users.push(userInfo.id)
            return companyItem;
        }
        return companyItem;
    });
    console.log('updateCompanyUsersFunction', newCompanyList)
    window.localStorage.setItem("storedCompanyList", JSON.stringify(newCompanyList))
}

export const deleteUserFromTable = (tableList: User[], userInfo: User): void => {
    let newUserList = tableList.filter(userItem => userItem.id !== userInfo.id);
    window.localStorage.setItem("storedUserList", JSON.stringify(newUserList));
    updateCompanyUsers(userInfo)
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
    dOB: '1990-01-01',
    position: '',
    phoneNumber: '',
};

export const positionsList = [
    'Manager',
    'Software Developer',
    'QA engineer',
    'Staff'
]