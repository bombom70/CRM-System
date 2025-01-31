import { Route, Routes } from 'react-router';
import { TodosPage } from './pages/TodosPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { MainLayout, AuthLayout } from './components/Layouts';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="registration" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
