import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { List, Button, Flex } from 'antd';
import { ModalUpdateUser } from '../../components/ModalUpdateUser';
import { excludeKeys } from '../../shared/constants';
import { usersApi } from '../../api/users/api';
import { skipToken } from '@reduxjs/toolkit/query';

export const UserProfilePage: FC = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = usersApi.useGetUserQuery(id ?? skipToken);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const goBack = () => {
    navigate('/users');
  };

  return (
    <>
      {isLoading && <h1>Загрузка...</h1>}
      <Flex gap={16} vertical>
        {data && (
          <List
            size="large"
            bordered
            dataSource={Object.entries(data).filter(
              ([key]) => !excludeKeys.includes(key)
            )}
            renderItem={([key, val]) => {
              return (
                <List.Item>
                  {key}: {val || '-'}
                </List.Item>
              );
            }}
          />
        )}
        <Flex gap={12}>
          <Button onClick={goBack} color="primary" variant="solid">
            Назад
          </Button>
          <Button onClick={handleOpenModal} color="cyan" variant="solid">
            Редактировать
          </Button>
        </Flex>
      </Flex>
      {data && (
        <ModalUpdateUser
          userProfile={data}
          isOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </>
  );
};
