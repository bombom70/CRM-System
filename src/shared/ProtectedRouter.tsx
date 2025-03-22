import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../store';
import { isAdmin } from '../store/slices/profileSlice';
import { StatusLoading } from './types';
import { Skeleton } from 'antd';

export const ProtectedRouter: FC = () => {
  const loading = useAppSelector((state) => state.profile.loading);
  const isAdminRole = useAppSelector(isAdmin);

  if (loading === StatusLoading.PENDING) {
    return <Skeleton active />;
  }

  if (loading === StatusLoading.FULFILLED && !isAdminRole) {
    return <Navigate to="/" replace />;
  }

  return isAdminRole && <Outlet />;
};
