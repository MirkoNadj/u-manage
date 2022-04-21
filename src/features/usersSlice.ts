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
    },
    
    deleteUser: (state) => {
      state.value.pop()
    },
    //editUser: (state, action: PayloadAction<number>) => {
      //state.value += action.payload
    //},
  },
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer