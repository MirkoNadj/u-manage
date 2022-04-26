import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Company, User} from '../Interfaces/ObjectInterfaces';
import {CompaniesState} from '../Interfaces/SliceInterfaces';

const initialState: CompaniesState = {
  companiesList: []
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action:PayloadAction<Company>) => {      
        state.companiesList.push(action.payload);
    },
    
    deleteCompany: (state, action:PayloadAction<Company>) => {
        let changedCompanyList = state.companiesList.filter(companyItem => companyItem.id !== action.payload.id);
        state.companiesList = changedCompanyList;
    },

    editCompany: (state, action: PayloadAction<Company>) => {
        let companyIndex = state.companiesList.findIndex((companyFromList: Company) => companyFromList.id === action.payload.id);
        state.companiesList[companyIndex] = action.payload;
    },

    updateCompanyUsers(state, action:PayloadAction<User>) {
        let changedCompanyList = state.companiesList.map((companyItem) => {
            if (companyItem.id === action.payload.companyId) {                
                companyItem.users.push(action.payload.id);
                return companyItem;
            }
            companyItem.users = companyItem.users.filter(userItem => userItem !== action.payload.id);
            return companyItem;
        });
        state.companiesList = changedCompanyList;
    }
  }
});

export const { addCompany, deleteCompany, editCompany, updateCompanyUsers } = companiesSlice.actions;

export default companiesSlice.reducer;