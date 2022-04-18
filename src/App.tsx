import React, { FC, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/partials/Header/Header';
import { Home } from './components/partials/Home/Home';
import { Users } from './components/Users/Users';
import { UserForm } from './components/UserForm/UserForm';
import { CompanyForm } from './components/CompanyForm/CompanyForm';
import { Companies } from './components/Companies/Companies';
import { PostsList } from './components/PostsList/PostsList';
import { PropsContextType } from './TypeFiles/ObjectTypes';

export const PropsContext = createContext<PropsContextType>({ currentCompany: '', setCurrentCompany: () => { } });

const App: FC = () => {
  const [currentCompany, setCurrentCompany] = useState('')
  return (
    <>
      <Router>
        <PropsContext.Provider value={{ currentCompany, setCurrentCompany }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/" element={<Users />} />
            <Route path="/users/create" element={<UserForm />} />
            <Route path="/users/:currentUserId" element={<UserForm />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/create" element={<CompanyForm />} />
            <Route path="/companies/:currentCompanyId" element={<CompanyForm />} />
            <Route path="/newsletterPosts" element={<PostsList />} />
          </Routes>
        </PropsContext.Provider>
      </Router>
    </>
  );
}

export default App;
