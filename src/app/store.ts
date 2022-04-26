import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import companiesReducer from '../features/companiesSlice';

function saveToLocalStorage(state:RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistantState', serialisedState);
  } catch (e) {
    console.warn(e)
  }
};

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistantState');
    if(serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  };
 };

export const store = configureStore({
  reducer: {
      users: usersReducer,
      companies: companiesReducer, 
  },
  preloadedState: loadFromLocalStorage()
});

store.subscribe(()=>saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;