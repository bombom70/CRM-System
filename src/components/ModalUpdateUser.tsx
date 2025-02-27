import { FC } from 'react';
import { Form, Input, Modal } from 'antd';
import { useAppDispatch } from '../store';
import { User } from '../api/users/types';
import { updateProfileUser } from '../store/slices/usersSlice';
import { excludeKeys } from '../shared/constants';

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
          acc[key] = formData[key];
        }
        return acc;
      },
      { id: String(userProfile.id) } as Record<string, string>
    );
};

export const ModalUpdateUser: FC<Props> = ({
  userProfile,
  isOpen,
  handleOk,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleFinished = async () => {
    try {
      const userData = makeUserData(userProfile, form.getFieldsValue());

      if (Object.keys(userData).length < 2) {
        handleOk();
        return;
      }

      await dispatch(updateProfileUser(userData));
      form.resetFields();
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
    handleCancel();
  };

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
      </Form>
    </Modal>
  );
};
