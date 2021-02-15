import React from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from "./ModalAddDeviceForm";

const ModalAddDevice = (props) => {
  console.log('ModalAddDevice');
  const {visible, setVisible} = props;
  function handleCancel(){
    setVisible(false)
  }
  return (
    <StyledModal
      visible={visible}
      height={488}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalAddDeviceForm {...props} handleCancel={handleCancel}/>
    </StyledModal>
  );
};

export default ModalAddDevice;
