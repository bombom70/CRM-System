import { FC } from 'react';
import { Form, Input, Modal } from 'antd';
import { useAppDispatch } from '../store';
import { User } from '../api/users/types';
import { updateProfileUser } from '../store/slices/usersSlice';

type Props = {
  userProfile: User;
  isOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};

export const ModalUpdateUser: FC<Props> = ({
  userProfile,
  isOpen,
  handleOk,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const dispath = useAppDispatch();

  const handleFinished = async () => {
    try {
      const userData = {
        id: userProfile.id,
        ...form.getFieldsValue(),
      };
      await dispath(updateProfileUser(userData));
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
