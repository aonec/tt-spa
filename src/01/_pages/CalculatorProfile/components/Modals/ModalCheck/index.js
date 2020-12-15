import React, { useContext } from 'react';
import { Modal } from 'antd';
import ModalCheckForm from './ModalCheckForm';
import { DeviceContext } from '../../../CalculatorProfile';

const CheckDevice = () => {
  const { check, setCheck, device } = useContext(DeviceContext);
  const handleCancel = () => {
    setCheck(false);
  };
  return (
    <Modal
      visible={check}
      height={488}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCheckForm handleCancel={handleCancel} device={device} />
    </Modal>
  );
};

export default CheckDevice;
