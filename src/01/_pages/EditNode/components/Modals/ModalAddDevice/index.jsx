import React from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from "./ModalAddDeviceForm";

const ModalAddDevice = () => {
  console.log('ModalAddDevice');

  return (
    <StyledModal
      visible
      height={488}
      width={800}
      footer={null}
    >
      <ModalAddDeviceForm />
    </StyledModal>
  );
};

export default ModalAddDevice;
