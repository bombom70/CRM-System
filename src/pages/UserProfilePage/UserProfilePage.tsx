import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate, useParams } from 'react-router';
import { getProfileUser } from '../../store/slices/usersSlice';
import { List, Button, Flex, Typography } from 'antd';
import { ModalUpdateUser } from '../../components/ModalUpdateUser';
import { StatusLoading } from '../../shared/types';
import { excludeKeys } from '../../shared/constants';
import { tokenStore } from '../../api/TokenStore';
import { refreshTokens } from '../../shared/refreshTokens';

export const UserProfilePage: FC = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userProfile, loading, error } = useAppSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const accessToken = tokenStore.getAccess() ?? '';

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh() ?? '';

    if (!accessToken && id) {
      refreshTokens(refreshToken, () => dispatch(getProfileUser(id)));
      return;
    }
    if (id) {
      dispatch(getProfileUser(id));
    }
  }, [id]);

  const { Text } = Typography;

  return (
    <>
      {loading === StatusLoading.PENDING && <h1>Загрузка...</h1>}
      <Flex gap={16} vertical>
        {loading === StatusLoading.REJECTED && error && (
          <Text type="danger">{error}</Text>
        )}
        {userProfile && (
          <List
            size="large"
            bordered
            dataSource={Object.entries(userProfile).filter(
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
      {userProfile && (
        <ModalUpdateUser
          userProfile={userProfile}
          isOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      )}
    </>
  );
};
