import { User, Company } from '../Interfaces/ObjectInterfaces';

export function getUsers() {
    let fetchedUserList = window.localStorage.getItem("storedUserList");
    if (!fetchedUserList) {
        fetchedUserList = '[]';
    };
    let parsedUserList: Array<User> = JSON.parse(fetchedUserList);
    //console.log('getUsersFunction', parsedUserList)
    return parsedUserList;
}

export function findUserById(currentUserId: string, userList: User[]) {
    let currentUserFoundByID = userList.find((userFromList: User) => userFromList.id === currentUserId);
    //console.log('findUserByIdFunction', currentUserFoundByID)
    return currentUserFoundByID;
}

export function findCompanyById(currentCompanyId: string) {
    let parsedCompanyList = getCompanies()
    let currentCompanyFoundByID = parsedCompanyList.find((companyFromList: Company) => companyFromList.id === currentCompanyId);
    //console.log('findCompanyByIdFunction', currentCompanyFoundByID)
    return currentCompanyFoundByID;
}

export function editUserById(currentUserId: string, userInfo: User) {
    let parsedUserList = getUsers()
    let userIndex = parsedUserList.findIndex((userFromList: User) => userFromList.id === currentUserId);
    parsedUserList[userIndex] = userInfo;
    window.localStorage.setItem("storedUserList", JSON.stringify(parsedUserList));
}

export function editCompanyById(currentCompanyId: string, companyInfo: Company, companyList: Company[]) {
    let companyIndex = companyList.findIndex((companyFromList: Company) => companyFromList.id === currentCompanyId);
    updateCompanyNameForUsers(currentCompanyId, companyInfo);
    companyList[companyIndex] = companyInfo;
    window.localStorage.setItem("storedCompanyList", JSON.stringify(companyList));
}

export function setUsers(userList: User[]) {
    //console.log('setUsersFunction', userList)
    window.localStorage.setItem("storedUserList", JSON.stringify(userList));
}

export function updateCompanyNameForUsers(currentCompanyId: string, companyInfo: Company) {
    let newUserList = getUsers().map((user) => {
        if (user.companyId === currentCompanyId) {
            user.companyName = companyInfo.name;
            return user;
        } else {
            return user
        };
    })
    window.localStorage.setItem("storedUserList", JSON.stringify(newUserList));
}

export function getCompanies() {
    let fetchedCompanyList = window.localStorage.getItem("storedCompanyList");
    if (!fetchedCompanyList) {
        fetchedCompanyList = '[]';
    };
    const parsedCompanyList: Array<Company> = JSON.parse(fetchedCompanyList);
    //console.log('getCompaniesFunction', parsedCompanyList)
    return parsedCompanyList;
}

export function updateCompanyUsers(userInfo: User) {
    let newCompanyList = getCompanies().map((companyItem) => {
        if (companyItem.id === userInfo.companyId) {
            companyItem.users = companyItem.users.filter(user => user !== userInfo.id)
            companyItem.users.push(userInfo.id)
            return companyItem;
        } else {
            return companyItem
        };
    });
    //console.log('updateCompanyUsersFunction', newCompanyList)
    window.localStorage.setItem("storedCompanyList", JSON.stringify(newCompanyList))
}

export function updateUserList(deletedCompanyId: string) {
    let newUserList = getUsers().filter(userItem => userItem.companyId !== deletedCompanyId);
    window.localStorage.setItem("storedUserList", JSON.stringify(newUserList));
}

export function deleteUserFromTable(tableList: User[], userInfo: User): void {
    let newUserList = tableList.filter(userItem => userItem.id !== userInfo.id);
    window.localStorage.setItem("storedUserList", JSON.stringify(newUserList));
    updateCompanyUsers(userInfo)
}

export function deleteCompanyFromTable(tableList: Company[], idToDelete: string): void {
    let newCompanyList = tableList.filter(companyItem => companyItem.id !== idToDelete);
    window.localStorage.setItem("storedCompanyList", JSON.stringify(newCompanyList));
    updateUserList(idToDelete);
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