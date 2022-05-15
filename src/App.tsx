import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './AppStyles/App.css';
import { Header } from './components/partials/Header/Header';
import { Home } from './components/partials/Home/Home';
import Users from './components/UsersPage/Users/Users';
import UserFormModal from './components/UsersPage/UserFormModal/UserFormModal';
import CompanyFormModal from './components/CompaniesPage/CompanyFormModal/CompanyFormModal';
import Companies from './components/CompaniesPage/Companies/Companies'
import PostsList from './components/PostsListPage/PostsList';
import { PostDetails } from './components/PostDetailsPage/PostDetails/PostDetails';

const App: FC = () => {

  const [theme, setTheme] = useState(true);

  return (
    <>
      <Router>
        <div className={`grid-container ${(theme) ? 'theme-light' : 'theme-dark'} `}>
          <Header theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/" element={<Users />} >
              <Route path="/users/create" element={<UserFormModal />} />
              <Route path="/users/:currentUserId" element={<UserFormModal />} />
            </Route>
            <Route path="/companies" element={<Companies />} >
              <Route path="/companies/create" element={<CompanyFormModal />} />
              <Route path="/companies/:currentCompanyId" element={<CompanyFormModal />} />
            </Route>
            <Route path="/newsletterPosts" element={<PostsList />} />
            <Route path="/newsletterPosts/:postDetailsId" element={<PostDetails />} />
          </Routes></div>
      </Router>
    </>
  );
}

export default App;
