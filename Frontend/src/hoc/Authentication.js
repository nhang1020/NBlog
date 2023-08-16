import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../redux/selector';
const PrivateRoute = ({ children }) => {
    const login = useSelector(isLogInSelector);

    return login ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute