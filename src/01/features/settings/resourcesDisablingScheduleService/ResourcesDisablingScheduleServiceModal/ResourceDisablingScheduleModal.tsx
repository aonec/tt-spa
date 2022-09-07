import { Modal } from 'antd';
import React from 'react';

export const ResourceDisablingScheduleModal: React.FC<{
  openModal: () => void;
  isModalOpen: boolean;
}> = ({ openModal, isModalOpen }) => {
  return (
    <Modal visible={isModalOpen} footer={null} onCancel={() => openModal()}>
      <p>Компонент в разработке</p>
    </Modal>
  );
};
