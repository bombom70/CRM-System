import { FC } from 'react';
import { RegistrationForm } from '../../components/Auth/RegistrationForm';
import { Flex } from 'antd';

export const RegisterPage: FC = () => {
  return (
    <Flex vertical gap={12}>
      <h1>Registration</h1>
      <RegistrationForm />
    </Flex>
  );
};
