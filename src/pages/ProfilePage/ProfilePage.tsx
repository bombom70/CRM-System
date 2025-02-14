import { FC, useEffect } from 'react';
import { getProfileData, StatusLoading } from '../../store/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button, List } from 'antd';
import { fetchLogout } from '../../api/user';
import { useNavigate } from 'react-router';
import { TokenStore } from '../../shared/TokenStore';

const excludeKeys = ['id', 'date', 'isBlocked', 'roles'];

export const ProfilePage: FC = () => {
  const { profileData, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tokenStore = new TokenStore();

  const handleLogout = async () => {
    await fetchLogout();
    tokenStore.clear();
    navigate('/auth/login');
  };

  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  return (
    <>
      {loading === StatusLoading.REJECTED && error && <h1>{error}</h1>}
      {loading === StatusLoading.PENDING && <h1>Загрузка...</h1>}
      {loading === StatusLoading.FULFILLED && profileData && (
        <>
          <List
            size="large"
            bordered
            dataSource={Object.entries(profileData).filter(
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
          <Button onClick={handleLogout} color="default" variant="solid">
            Выйти
          </Button>
        </>
      )}
    </>
  );
};
