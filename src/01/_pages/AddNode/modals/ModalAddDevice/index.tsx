import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddDevice = () => {
  const {
    addHousingMeteringDeviceVisible: visible,
    setAddHousingMeteringDeviceVisible: setVisible,
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
      <AddDeviceForm setVisible={setVisible} />
    </StyledModal>
  );
};

export default ModalAddDevice;
