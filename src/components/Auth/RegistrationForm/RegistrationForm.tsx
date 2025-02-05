import { FC, useState } from 'react';
import { Form, Button, Input, Flex, FormProps, Typography } from 'antd';
import { fetchSignup } from '../../../api/user';
import axios from 'axios';
import { Modal } from '../Modal';
import { Link } from 'react-router';

type FieldType = {
  username: string;
  login: string;
  password: string;
  repeatPassword: string;
  email: string;
  phone: string;
};

export const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFinished: FormProps<FieldType>['onFinish'] = async () => {
    try {
      setFormDisabled(true);
      const valuesForm = form.getFieldsValue();
      await fetchSignup(valuesForm);
      setErrorMessage('');
      form.resetFields();
      setIsModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          'Пользователь с таким логином или адресом электронной почты уже существует'
        );
      }
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
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              { whitespace: true },
              { min: 1, message: 'Минимальное количество символов 1' },
              { max: 60, message: 'Максимальное количество символов 60' },
              () => ({
                validator(_, value) {
                  const regex = /^[a-zA-Zа-яА-Я]+$/;
                  if (!value || regex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'Вводить можно только буквы русского и латинского алфавита!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item<FieldType>
            label="Повторите пароль"
            name="repeatPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароль должен совпадать!'));
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Обязательное поле',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Телефон"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              () => ({
                validator(_, value) {
                  const phoneRegex = /^(?:\+?\d{1,3})?(\d{10})$/;
                  if (!value || phoneRegex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'Пожалуйста, введите действительный номер телефона!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item<FieldType>>
            <Flex gap={4}>
              <Button
                style={{ background: '#7F265B' }}
                type="primary"
                htmlType="submit"
                block
              >
                Зарегистрироваться
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
      <Modal
        isOpen={isModalOpen}
        title="Регистрация прошла успешно!"
        setIsModalOpen={setIsModalOpen}
      >
        <p>
          Перейдите на страницу <Link to="/auth/login"> авторизации </Link> для
          входа в систему
        </p>
      </Modal>
    </>
  );
};
