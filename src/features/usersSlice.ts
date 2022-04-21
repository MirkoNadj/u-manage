import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storedUserList } from '../entities/StoredLists'
import {User} from '../Interfaces/ObjectInterfaces'

export interface usersState {
  value: User[]
}

const initialState: usersState = {
  value: storedUserList,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<User>) => {      
      state.value.push(action.payload)
      console.log(state.value)
    },
    
    deleteUser: (state, action:PayloadAction<User>) => {
        let arr = state.value.filter(item => item.id !== action.payload.id)
        state.value = arr
    },

    editUser: (state, action: PayloadAction<User>) => {
       let userIndex = state.value.findIndex((userFromList: User) => userFromList.id === action.payload.id);
    state.value[userIndex] = action.payload
},

}})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, editUser } = usersSlice.actions

export default usersSlice.reducer