import { FC, useState } from 'react';
import axios from 'axios';
import { Flex, Input, Button, Form, FormProps, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { fetchSignin } from '../../../api/user';
import { TokenStore } from '../../../shared/TokenStore';
import { useAppDispatch } from '../../../store';
import { changeAuth } from '../../../store/user/userReducer';

type FieldType = {
  login: string;
  password: string;
};

export const LoginForm: FC = () => {
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tokenStore = new TokenStore();

  const handleFinished: FormProps<FieldType>['onFinish'] = async () => {
    try {
      setFormDisabled(true);
      const valuesForm = form.getFieldsValue();
      const { accessToken, refreshToken } = await fetchSignin(valuesForm);
      tokenStore.setTokens(accessToken, refreshToken);
      dispatch(changeAuth(true));
      setErrorMessage('');
      form.resetFields();
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage('Неверные логин или пароль');
      }
      dispatch(changeAuth(false));
      throw error;
    } finally {
      setFormDisabled(false);
    }
  };

  const { Text } = Typography;

  return (
    <>
      <Text type="danger">{errorMessage}</Text>
      <Form
        form={form}
        onFinish={handleFinished}
        autoComplete="off"
        layout="vertical"
        disabled={formDisabled}
      >
        <Flex vertical>
          <Form.Item<FieldType>
            label="Логин"
            name="login"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              { whitespace: true },
              { min: 2, message: 'Минимальное количество символов 2' },
              { max: 60, message: 'Максимальное количество символов 60' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              { whitespace: true },
              { min: 6, message: 'Минимальное количество символов 6' },
              { max: 60, message: 'Максимальное количество символов 60' },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item<FieldType>>
            <Flex gap={4}>
              <Button
                style={{ background: '#7F265B' }}
                type="primary"
                htmlType="submit"
                block
              >
                Войти
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};
