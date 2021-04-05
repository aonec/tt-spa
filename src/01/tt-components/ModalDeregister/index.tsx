import React from 'react';
import DeregisterForm from './DeregisterForm';
import { StyledModal } from '../Modal';

const ModalDeregister = ({ visible, setVisible, device }: any) => {
  if (!device) {
    return null;
  }

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <StyledModal
      visible={visible}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <DeregisterForm
        handleCancel={handleCancel}
        device={device}
        setVisible={setVisible}
      />
    </StyledModal>
  );
};

export default ModalDeregister;
