import { FC } from 'react';
import { UsersTable } from '../../components/UsersTable';
import { Typography } from 'antd';

export const UsersPage: FC = () => {
  const { Title } = Typography;

  return (
    <>
      <Title level={2}>Пользователи</Title>
      <UsersTable />
    </>
  );
};
