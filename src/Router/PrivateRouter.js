import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userName = localStorage.getItem('userName');

  return userName ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
