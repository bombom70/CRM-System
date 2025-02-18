import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { TodosPage } from './pages/TodosPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { MainLayout, AuthLayout } from './components/Layouts';
import { tokenStore } from './api/TokenStore';

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const refreshToken = tokenStore.getRefresh();

    if (!refreshToken && !location.pathname.includes('registration')) {
      tokenStore.clear();
      navigate('/auth/login');
      return;
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
