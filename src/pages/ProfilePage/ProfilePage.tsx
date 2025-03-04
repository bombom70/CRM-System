import { FC, useEffect } from 'react';
import { getProfileData } from '../../store/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button, List } from 'antd';
import { useNavigate } from 'react-router';
import { tokenStore } from '../../api/TokenStore';
import { fetchLogout } from '../../api/profile/profile';
import { StatusLoading } from '../../shared/types';
import { refreshTokens } from '../../shared/refreshTokens';

const excludeKeys = ['id', 'date', 'isBlocked', 'roles'];

export const ProfilePage: FC = () => {
  const { profileData, loading, error } = useAppSelector(
    (state) => state.profile
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = tokenStore.getAccess() ?? '';

  const handleLogout = async () => {
    try {
      await fetchLogout();
      localStorage.removeItem('isAdmin');
      tokenStore.clear();
      navigate('/auth/login');
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh() ?? '';

    if (!accessToken) {
      refreshTokens(refreshToken, () => dispatch(getProfileData()));
      return;
    }

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
