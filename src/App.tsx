import { Route, Routes } from 'react-router';
import { TodosPage } from './pages/TodosPage';
import { ProfilePage } from './pages/ProfilePage';
import { Layout } from './components/Layout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
