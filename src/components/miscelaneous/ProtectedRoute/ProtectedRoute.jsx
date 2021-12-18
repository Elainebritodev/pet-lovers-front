import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLogged, Page }) => {
  return isLogged ? <Page /> : <Navigate to="/" />;
};

export default ProtectedRoute;
