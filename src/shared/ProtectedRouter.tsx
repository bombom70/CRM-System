import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useIsAdmin } from './utils';

export const ProtectedRouter: FC = () => {
  const isAdmin = useIsAdmin();
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
