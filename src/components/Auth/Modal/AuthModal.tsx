import { FC } from 'react';
import { Modal } from 'antd';

type Props = {
  title: string;
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  children: string | JSX.Element;
};

export const AuthModal: FC<Props> = ({
  title,
  isOpen,
  children,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
};
