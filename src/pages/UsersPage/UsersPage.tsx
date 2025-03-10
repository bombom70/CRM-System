import { FC } from 'react';
import { Table } from '../../components/Table';
import { Typography } from 'antd';

export const UsersPage: FC = () => {
  const { Title } = Typography;

  return (
    <>
      <Title level={2}>Пользователи</Title>
      <Table />
    </>
  );
};
