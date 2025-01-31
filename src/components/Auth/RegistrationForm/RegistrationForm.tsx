import { FC, useState } from 'react';
import { Form, Button, Input, Flex, FormProps } from 'antd';
import { fetchUserData } from '../../../api/user';
import axios from 'axios';
import { Modal } from '../../Modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleFinished: FormProps<FieldType>['onFinish'] = async () => {
    try {
      setFormDisabled(true);
      const valuesForm = form.getFieldsValue();
      await fetchUserData(valuesForm);
      form.resetFields();
      setIsModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        form.setFields([{ name: 'login', errors: [error.response?.data] }]);
      }
      throw error;
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFinished}
        autoComplete="off"
        layout="vertical"
        disabled={formDisabled}
      >
        <Flex vertical gap={8}>
          <Form.Item<FieldType>
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
              },
              { whitespace: true },
              { min: 1, message: 'Minimum number of characters 1' },
              { max: 60, message: 'Maximum number of characters 60' },
              () => ({
                validator(_, value) {
                  const regex = /^[a-zA-Zа-яА-Я]+$/;
                  if (!value || regex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'You can only enter letters of the Russian and Latin alphabet!'
                    )
                  );
                },
              }),
            ]}
            style={{ flexGrow: 1 }}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Логин"
            name="login"
            rules={[
              {
                required: true,
              },
              { whitespace: true },
              { min: 2, message: 'Minimum number of characters 2' },
              { max: 60, message: 'Maximum number of characters 60' },
            ]}
            style={{ flexGrow: 1 }}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
              },
              { whitespace: true },
              { min: 6, message: 'Minimum number of characters 6' },
              { max: 60, message: 'Maximum number of characters 60' },
            ]}
            style={{ flexGrow: 1 }}
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
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  );
                },
              }),
            ]}
            style={{ flexGrow: 1 }}
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
              },
            ]}
            style={{ flexGrow: 1 }}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Телефон"
            name="phone"
            rules={[
              {
                required: true,
              },
              () => ({
                validator(_, value) {
                  const phoneRegex = /^(?:\+?\d{1,3})?(\d{10})$/;
                  if (!value || phoneRegex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Please enter a valid phone number!')
                  );
                },
              }),
            ]}
            style={{ flexGrow: 1 }}
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
        title={'Регистрация прошла успешно!'}
        setIsModalOpen={setIsModalOpen}
      >
        <p>
          Перейдите на страницу <Link to="/auth"> авторизации </Link> для входа
          в систему
        </p>
      </Modal>
    </>
  );
};
