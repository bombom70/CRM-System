import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { TodosPage } from './pages/TodosPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { MainLayout, AuthLayout } from './components/Layouts';
import { fetchRefresh } from './api/user';

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTokens = async (token: string) => {
    try {
      const { accessToken, refreshToken } = await fetchRefresh({
        refreshToken: token,
      });
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('refreshToken');

    if (token) {
      getTokens(token);
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
