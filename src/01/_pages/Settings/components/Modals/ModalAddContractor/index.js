import React from 'react';
import { Modal } from 'antd';
import ModalAddContractorForm from './ModalAddContractorForm';

export const ModalAddContractor = (props) => {
  const {contractor, setContractor} = props;
  console.log('ModalAddStaff');
  return (
    <Modal
      visible={contractor}
      width={800}
      footer={null}
    >
      <ModalAddContractorForm />
    </Modal>
  );
};

export default ModalAddContractor;
