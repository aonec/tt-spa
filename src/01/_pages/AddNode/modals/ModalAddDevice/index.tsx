import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddDevice = () => {
  const { addHousingVisible, setAddHousingVisible } = useContext(
    AddNodeContext
  );

  return (
    <StyledModal
      onCancel={() => {
        setAddHousingVisible(false);
      }}
      footer={null}
      width={800}
      visible={addHousingVisible}
    >
      <AddDeviceForm />
    </StyledModal>
  );
};

export default ModalAddDevice;
