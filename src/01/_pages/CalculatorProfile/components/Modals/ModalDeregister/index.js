import React, { useContext } from 'react';
import { Modal } from 'antd';
import ModalDeregisterForm from './ModalDeregisterForm';
import { DeviceContext } from '../../../CalculatorProfile';

const DeregisterDevice = () => {
  console.log('DeregisterDevice');
  const { deregister, setDeregister, device } = useContext(DeviceContext);
  const handleCancel = () => {
    setDeregister(false);
  };
  return (
    <Modal
      visible={deregister}
      height={488}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalDeregisterForm handleCancel={handleCancel} device={device} />
    </Modal>
  );
};

export default DeregisterDevice;
