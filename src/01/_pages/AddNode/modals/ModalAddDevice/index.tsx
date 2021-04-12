import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './AddDeviceForm';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddDevice = () => {
  const { setAddOdpu, addOdpu } = useContext(AddNodeContext);
  function handleCancel() {
    setAddOdpu(false);
  }
  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
    >
      <AddDeviceForm handleCancel={handleCancel} />
    </StyledModal>
  );
};

export default ModalAddDevice;
