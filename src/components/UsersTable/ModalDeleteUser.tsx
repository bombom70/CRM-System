import { FC } from 'react';
import { Modal } from 'antd';

type Props = {
  isOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};

export const ModalDeleteUser: FC<Props> = ({
  isOpen,
  handleOk,
  handleCancel,
}) => {
  const handleFinished = async () => {
    try {
      await handleOk();
    } catch (error) {
      throw error;
    }
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <Modal
      title="Подтвердить действие"
      open={isOpen}
      onOk={handleFinished}
      okText="Подтверждаю"
      cancelText="Отмена"
      onCancel={onCancel}
    ></Modal>
  );
};
