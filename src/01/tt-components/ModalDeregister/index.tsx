import React from 'react';
import DeregisterForm from './DeregisterForm';
import { StyledModal } from '../Modal';
import Header from '../Header';

const ModalDeregister = ({ visible, setVisible, device }: any) => {
  if (!device) {
    return null;
  }

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <StyledModal
      title={<Header>Вы действительно хотите уйти без сохранения?</Header>}
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
