import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { TodosPage } from './pages/TodosPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { MainLayout, AuthLayout } from './components/Layouts';
import { fetchRefresh } from './api/user';
import { TokenStore } from './shared/TokenStore';
import { useAppDispatch, useAppSelector } from './store';
import { changeAuth } from './store/slices/profileSlice';

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokenStore = new TokenStore();
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const dispatch = useAppDispatch();

  const refresh = async (token: string) => {
    try {
      const { accessToken, refreshToken } = await fetchRefresh({
        refreshToken: token,
      });
      tokenStore.setTokens(accessToken, refreshToken);
      dispatch(changeAuth(true));
    } catch (error) {
      tokenStore.clear();
      dispatch(changeAuth(false));
      throw error;
    }
  };

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh();
    if (isAuth && refreshToken) {
      refresh(refreshToken);
      return;
    }

    if (!location.pathname.includes('registration')) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="registration" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
