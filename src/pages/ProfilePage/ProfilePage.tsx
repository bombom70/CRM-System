import { FC, useEffect } from 'react';
import { fetchProfile, StatusLoading } from '../../store/user/userReducer';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button, List } from 'antd';
import { fetchLogout } from '../../api/user';
import { useNavigate } from 'react-router';

const excludeKeys = ['id', 'date', 'isBlocked', 'roles'];

export const ProfilePage: FC = () => {
  const { profileData, loading, error } = useAppSelector((state) => state.user);
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetchLogout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/auth/login');
  };

  useEffect(() => {
    dispath(fetchProfile());
  }, []);

  return (
    <>
      {loading === StatusLoading.REJECTED && error && <h1>{error}</h1>}
      {loading === StatusLoading.PENDING && <h1>Загрузка...</h1>}
      {profileData && (
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
