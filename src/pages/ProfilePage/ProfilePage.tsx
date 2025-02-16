import { FC, useEffect } from 'react';
import { getProfileData, StatusLoading } from '../../store/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Button, List } from 'antd';
import { fetchLogout, fetchRefresh } from '../../api/user';
import { useNavigate } from 'react-router';
import { tokenStore } from '../../shared/TokenStore';

const excludeKeys = ['id', 'date', 'isBlocked', 'roles'];

export const ProfilePage: FC = () => {
  const { profileData, loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = tokenStore.getAccess() ?? '';

  const handleLogout = async () => {
    await fetchLogout();
    tokenStore.clear();
    navigate('/auth/login');
  };

  const refreshTokens = async (refreshToken: string) => {
    try {
      const newTokens = await fetchRefresh({ refreshToken });
      tokenStore.setAccess(newTokens.accessToken);
      tokenStore.setRefresh(newTokens.refreshToken);
      dispatch(getProfileData());
    } catch (error) {
      tokenStore.clear();
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
