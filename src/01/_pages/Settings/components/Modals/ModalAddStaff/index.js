import React from 'react';
import { Modal } from 'antd';
import ModalAddStaffForm from './ModalAddStaffForm';

export const ModalAddStaff = (props) => {
  const {staff, setStaff} = props
  console.log('ModalAddStaff');
  return (
    <Modal
      visible={staff}
      width={800}
      footer={null}
    >
      <ModalAddStaffForm />
    </Modal>
  );
};

export default ModalAddStaff;
