import React from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from "./ModalAddDeviceForm";

const ModalAddDevice = (props) => {
  console.log('ModalAddDevice');

  return (
    <StyledModal
      visible
      height={488}
      width={800}
      footer={null}
    >
      <ModalAddDeviceForm {...props}/>
    </StyledModal>
  );
};

export default ModalAddDevice;
