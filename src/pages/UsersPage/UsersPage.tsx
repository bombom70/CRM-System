import { FC, useEffect } from 'react';
import { Table } from '../../components/Table';
import { getUsersData } from '../../store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Typography } from 'antd';
import { fetchRefresh } from '../../api/profile/profile';
import { tokenStore } from '../../api/TokenStore';
import { useNavigate } from 'react-router';

export const UsersPage: FC = () => {
  const { users, filters, meta, loading } = useAppSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = tokenStore.getAccess() ?? '';

  const refreshTokens = async (refreshToken: string) => {
    try {
      const newTokens = await fetchRefresh({ refreshToken });
      tokenStore.setAccess(newTokens.accessToken);
      tokenStore.setRefresh(newTokens.refreshToken);
      dispatch(getUsersData(filters));
    } catch (error) {
      tokenStore.clear();
      localStorage.removeItem('isAdmin');
      navigate('/auth/login');
      throw error;
    }
  };

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh() ?? '';

    if (!accessToken) {
      refreshTokens(refreshToken);
      return;
    }

    dispatch(getUsersData(filters));
  }, [filters]);

  const { Title } = Typography;

  return (
    <>
      <Title level={2}>Пользователи</Title>
      <Table users={users} totalAmount={meta.totalAmount} loading={loading} />
    </>
  );
};
