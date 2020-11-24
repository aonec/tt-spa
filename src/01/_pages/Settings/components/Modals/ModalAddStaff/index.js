import React, { useContext } from 'react';
import { Modal } from 'antd';
import ModalAddStaffForm from './ModalAddStaffForm';
import {SettingsContext} from "../../../index";

export const ModalAddStaff = () => {
  const {staff, setStaff, hideStaff} = useContext(SettingsContext);

  console.log('ModalAddStaff');
  return (
    <Modal
      visible={staff}
      width={800}
      footer={null}
      onCancel={hideStaff}
    >
      <ModalAddStaffForm />
    </Modal>
  );
};

export default ModalAddStaff;
