import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRouter: FC = () => {
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '');
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
