import { FC } from 'react';
import { Button, Flex } from 'antd';
import { LoginForm } from '../../components/Auth/LoginForm';
import { useNavigate } from 'react-router';

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical>
      <h1>Вход</h1>
      <LoginForm />
      <Button
        style={{ background: '#FFE6C9', color: '#7F265B' }}
        type="primary"
        block
        onClick={() => navigate('/auth/registration')}
      >
        Зарегистрироваться
      </Button>
    </Flex>
  );
};
