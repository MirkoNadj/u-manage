import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import {User, Company} from '../Interfaces/ObjectInterfaces';
import { UsersState} from '../Interfaces/SliceInterfaces';

const initialState: UsersState = {
  usersList: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<User>) => {      
        state.usersList.push(action.payload);
    },
    
    deleteUser: (state, action:PayloadAction<User>) => {
        let changedUserList = state.usersList.filter(userItem => userItem.id !== action.payload.id);
        state.usersList = changedUserList;
    },

    editUser: (state, action: PayloadAction<User>) => {
        let userIndex = state.usersList.findIndex((userFromList: User) => userFromList.id === action.payload.id);
        state.usersList[userIndex] = action.payload;
    },

    updateCompanyNameForUsers: (state, action: PayloadAction<Company>) => {
        let changedUserList = state.usersList.map((userItem) => {
            if (userItem.companyId === action.payload.id) {
                userItem.companyName = action.payload.name;
                return userItem;
            }
        return userItem;
        });
        state.usersList = changedUserList;
    },
    removeCompanyNameForUsers: (state, action: PayloadAction<Company>) => {
      let changedUserList = state.usersList.map((userItem) => {
          if (userItem.companyId === action.payload.id) {
              userItem.companyName = '---';
              return userItem;
          }
      return userItem;
      });
      state.usersList = changedUserList;
  },
  }
});

export const { addUser, deleteUser, editUser, updateCompanyNameForUsers, removeCompanyNameForUsers } = usersSlice.actions;

export default usersSlice.reducer;