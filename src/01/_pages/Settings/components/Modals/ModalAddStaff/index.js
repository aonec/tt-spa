import React from 'react';
import { Modal } from 'antd';
import ModalAddStaffForm from './ModalAddStaffForm';

export const ModalAddStaff = () => {
  console.log('ModalAddStaff');
  return (
    <Modal
      visible={false}
      width={800}
      footer={null}
    >
      <ModalAddStaffForm />
    </Modal>
  );
};

export default ModalAddStaff;
