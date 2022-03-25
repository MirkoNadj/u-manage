import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/partials/Header/Header';
import { Home } from './components/partials/Home/Home';
import { UserForm } from './components/UserForm/UserForm';
import { storedUserList, storedCompanyList, storedPositionList } from './entities/StoredLists';     // temporary list



const App: FC = () => {

  window.localStorage.setItem('storedUserList', JSON.stringify(storedUserList));
  window.localStorage.setItem('storedCompanyList', JSON.stringify(storedCompanyList));
  window.localStorage.setItem('storedPositionList', JSON.stringify(storedPositionList))


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/users/" element={<Users />}/> */}
          <Route path="/users/create" element={<UserForm />} />
          {/*    <Route path="/users/{id}" element={<UserForm />}/>
        <Route path="/companies" element={<Companies />}/>
        <Route path="/companies/create" element={<CompanyForm />}/>
        <Route path="/companies/{id}" element={<CompanyForm />}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
