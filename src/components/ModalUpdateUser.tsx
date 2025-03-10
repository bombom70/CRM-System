import { FC, useState } from 'react';
import { Form, Input, Modal, Typography } from 'antd';
import { User, UserRequest } from '../api/users/types';
import { excludeKeys } from '../shared/constants';
import { usersApi } from '../api/users/api';

type Props = {
  userProfile: User;
  isOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};

const makeUserData = (userProfile: User, formData: Record<string, string>) => {
  return Object.entries(userProfile)
    .filter(([key]) => !excludeKeys.includes(key))
    .reduce(
      (acc, [key, val]) => {
        if (formData[key] !== val) {
          acc[key as keyof UserRequest] = formData[key];
        }
        return acc;
      },
      { id: String(userProfile.id) } as UserRequest
    );
};

export const ModalUpdateUser: FC<Props> = ({
  userProfile,
  isOpen,
  handleOk,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [updateUserError, setUpdateUserError] = useState('');
  const [updateUser] = usersApi.useUpdateUserMutation();

  const handleFinished = async () => {
    try {
      const userData = makeUserData(userProfile, form.getFieldsValue());

      if (Object.keys(userData).length < 2) {
        handleOk();
        return;
      }

      const result = await updateUser(userData);

      if (result?.error && 'data' in result.error) {
        setUpdateUserError(String(result.error.data));
        return;
      }
      setUpdateUserError('');
      handleOk();
    } catch (error) {
      throw error;
    }
  };

  const onCancel = () => {
    form.setFieldsValue({
      username: userProfile.username,
      email: userProfile.email,
      phoneNumber: userProfile.phoneNumber,
    });
    setUpdateUserError('');
    handleCancel();
  };

  const { Text } = Typography;

  return (
    <Modal
      title="Данные пользователя"
      open={isOpen}
      onOk={handleFinished}
      onCancel={onCancel}
    >
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          username: userProfile.username,
          email: userProfile.email,
          phoneNumber: userProfile.phoneNumber,
        }}
      >
        <Form.Item name="username">
          <Input placeholder="Введите имя пользователя" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Введите email" />
        </Form.Item>
        <Form.Item name="phoneNumber">
          <Input placeholder="Введите номер телефона" />
        </Form.Item>
        {updateUserError && <Text type="danger">{updateUserError}</Text>}
      </Form>
    </Modal>
  );
};
