import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/partials/Header/Header';
import { Home } from './components/partials/Home/Home';
import { Users } from './components/Users/Users';
import UserForm from './components/UserForm/UserForm';
import CompanyForm from './components/CompanyForm/CompanyForm';
import { Companies } from './components/Companies/Companies';
import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetailsPage/PostDetails/PostDetails';

const App: FC = () => {
  return (
    <>
      <Router>
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
          <Route path="/newsletterPosts/:postDetailsId" element={<PostDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
