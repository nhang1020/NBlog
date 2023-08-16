import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { isLogInSelector, userInfoSelector } from './redux/selector';
import { AnimatePresence } from 'framer-motion';

import AppClient from './components/AppClient';
import Home from './components/Client/Pages/Home';
import AdminHome from './components/Admin/Home';
import Admin from './components/Admin/index';
import UserManage from './components/Admin/Managers/UserManage';
import PostManage from './components/Admin/Managers/PostManage';
import Login from './components/Auth/Login'
import PrivateRoute from './hoc/Authentication'
import Register from './components/Auth/Register'
import NotFound from './components/Client/Pages/NotFound'
import Toast from './components/componentsCustom/toast';
import appSlice from './redux/silceReducers/appSlice'
import MakeFriend from './components/Client/Pages/MakeFriend'
import PersonalPage from './components/Client/Pages/PersonalPage'
import Search from './components/Client/Pages/Search';
import PostDetail from './components/Client/Childcomponents/PostDetail';


function App() {
  const location = useLocation();
  const login = useSelector(isLogInSelector);
  const user = useSelector(userInfoSelector);

  const [isLogIn, setIsLogIn] = useState(login);
  const [userRole, setUserRole] = useState(user.role);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        dispatch(appSlice.actions.logOut());
      }
    });
    // window.addEventListener('storage', (event) => {
    //   if (event.storageArea === localStorage && event.key === 'userInfo') {
    //     dispatch(appSlice.actions.logOut());
    //   }
    // });
    setIsLogIn(login);
    if (user) {
      setUserRole(user.role);
    }
  }, [login], [user])
  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        {/* client route */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PrivateRoute>
              <AppClient />
            </PrivateRoute>
          } >
            <Route index element={<Home />} />
            <Route path='make-friend' element={<MakeFriend />} />
            <Route path="/*" element={<NotFound />} />
            <Route path='/user/info/:id' element={<PersonalPage />} />
            <Route path='/search/:key' element={<Search />} />
            <Route path='/post/:id' element={<PostDetail />} />
          </Route>

          {/* admin route */}
          <Route path="/admin/" element={userRole === "R0" ?
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
            :
            <Navigate to='/not-found' replace />
          } >

            <Route index element={<AdminHome />} />
            <Route path="users-manage" element={<UserManage />} />
            <Route path="posts-manage" element={<PostManage />} />
          </Route>

          {/* login route */}
          <Route path='/login' element={isLogIn ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={isLogIn ? <Navigate to='/' /> : <Register />} />
        </Routes>

      </AnimatePresence>
      <Toast />
    </>
  );
}

export default App;
