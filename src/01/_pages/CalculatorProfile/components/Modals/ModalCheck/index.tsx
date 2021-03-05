import React, { useContext } from 'react';
import { Modal } from 'antd';
import ModalCheckForm from './ModalCheckForm';
import { DeviceContext } from '../../../CalculatorProfile';
import {StyledModal} from '../../../../../tt-components/Modal'

const CheckDevice = () => {
  // const { check, setCheck, device } = useContext(DeviceContext);
  const { check, setCheck, device  } = useContext(DeviceContext);
  const handleCancel = () => {
    if (setCheck === undefined) return
    setCheck(false);
  };


  return (
    <StyledModal
      visible={check}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCheckForm handleCancel={handleCancel} device={device} />
    </StyledModal>
  );
};

export default CheckDevice;
