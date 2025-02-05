import { FC } from 'react';
import { Modal as AntModal } from 'antd';

type Props = {
  title: string;
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  children: string | JSX.Element;
};

export const Modal: FC<Props> = ({
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
    <AntModal
      title={title}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </AntModal>
  );
};
