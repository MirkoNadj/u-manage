import { configureStore } from '@reduxjs/toolkit';
import usersmitaReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
      users: usersmitaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch