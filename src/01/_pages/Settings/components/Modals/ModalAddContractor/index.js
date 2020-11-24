import React from 'react';
import { Modal } from 'antd';
import ModalAddContractorForm from './ModalAddContractorForm';

export const ModalAddContractor = () => {
  console.log('ModalAddStaff');
  return (
    <Modal
      visible
      width={800}
      footer={null}
    >
      <ModalAddContractorForm />
    </Modal>
  );
};

export default ModalAddContractor;
