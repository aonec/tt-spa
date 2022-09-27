import { Modal } from 'antd';
import React from 'react';
import { ResourceDisablingScheduleModalProps } from './ResourceDisablingScheduleModal.types';

export const ResourceDisablingScheduleModal: React.FC<ResourceDisablingScheduleModalProps> = ({ openModal, isModalOpen, closeModal }) => {
  return (
    <Modal visible={isModalOpen} footer={null} onCancel={() => closeModal()}>
      <p>Компонент в разработке</p>
    </Modal>
  );
};
