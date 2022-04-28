import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import companiesReducer from '../features/companiesSlice';
import postsReducer from '../features/postsSlice';



function saveToLocalStorage(state:Partial<RootState>) {
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
      posts:postsReducer,
  },
  preloadedState: loadFromLocalStorage()
});

store.subscribe(()=>{
  saveToLocalStorage({
    users: store.getState().users,
    companies: store.getState().companies
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;