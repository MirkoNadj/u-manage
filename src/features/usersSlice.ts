import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '../Interfaces/ObjectInterfaces'

export interface usersState {
  value: User[]
}

const initialState: usersState = {
  value: window.localStorage.getItem("storedUserList") ? JSON.parse(window.localStorage.getItem("storedUserList")!) : []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<User>) => {      
        state.value.push(action.payload);
        window.localStorage.setItem("storedUserList", JSON.stringify(state.value));
    },
    
    deleteUser: (state, action:PayloadAction<User>) => {
        let arr = state.value.filter(item => item.id !== action.payload.id)
        state.value = arr;
        window.localStorage.setItem("storedUserList", JSON.stringify(state.value));
    },

    editUser: (state, action: PayloadAction<User>) => {
        let userIndex = state.value.findIndex((userFromList: User) => userFromList.id === action.payload.id);
        state.value[userIndex] = action.payload;
        window.localStorage.setItem("storedUserList", JSON.stringify(state.value));
},

}})

export const { addUser, deleteUser, editUser } = usersSlice.actions

export default usersSlice.reducer