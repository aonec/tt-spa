import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddDevice = () => {
  const {
    addHousingVisible: visible,
    setAddHousingVisible: setVisible,
  } = useContext(AddNodeContext);

  return (
    <StyledModal
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      width={800}
      visible={visible}
    >
      <AddDeviceForm />
    </StyledModal>
  );
};

export default ModalAddDevice;
