import React, { useContext } from 'react';
import { Modal } from 'antd';
import ModalAddContractorForm from './ModalAddContractorForm';
import { SettingsContext } from '../../../index';

export const ModalAddContractor = () => {
  const { contractor, hideContractor } = useContext(SettingsContext);

  return (
    <Modal
      visible={contractor}
      width={800}
      footer={null}
      onCancel={hideContractor}
    >
      <ModalAddContractorForm />
    </Modal>
  );
};

export default ModalAddContractor;
