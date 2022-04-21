import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '../Interfaces/ObjectInterfaces'

export interface usersState {
  value: User[]
}

const initialState: usersState = {
  value: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state) => {
      
      state.value.push()
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