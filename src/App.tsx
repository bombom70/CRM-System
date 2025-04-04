import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { TodosPage } from './pages/TodosPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { MainLayout, AuthLayout } from './components/Layouts';
import { tokenStore } from './api/TokenStore';
import { UsersPage } from './pages/UsersPage';
import { ProtectedRouter } from './shared/ProtectedRouter';
import { UserProfilePage } from './pages/UserProfilePage';
import { getProfileData } from './store/slices/profileSlice';
import { useAppDispatch } from './store';
import { refreshTokens } from './shared/refreshTokens';

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const accessToken = tokenStore.getAccess() ?? '';

  const getProfile = async (refreshToken: string) => {
    await refreshTokens(refreshToken);
    dispatch(getProfileData());
  };

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh() ?? '';

    if (!refreshToken && !location.pathname.includes('registration')) {
      tokenStore.clear();
      navigate('/auth/login');
      return;
    }

    if (!accessToken) {
      getProfile(refreshToken);
      return;
    }
    dispatch(getProfileData());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route element={<ProtectedRouter />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserProfilePage />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="registration" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="registration" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
