import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Useroutlet = () => {
  const accessToken = localStorage.getItem('access_token');

  return <div>{accessToken ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default Useroutlet;
