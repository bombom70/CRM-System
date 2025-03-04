import { FC, useEffect } from 'react';
import { Table } from '../../components/Table';
import { getUsersData } from '../../store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Typography } from 'antd';
import { tokenStore } from '../../api/TokenStore';
import { refreshTokens } from '../../shared/refreshTokens';

export const UsersPage: FC = () => {
  const { users, filters, meta, loading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const accessToken = tokenStore.getAccess() ?? '';

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh() ?? '';

    if (!accessToken) {
      refreshTokens(refreshToken, () => dispatch(getUsersData(filters)));
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
