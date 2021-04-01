import React, { useEffect, useState } from 'react';
import ModalCalculatorDeregisterForm from './ModalDeregisterForm';
import { getCalculator } from './apiDeregisterDevice';
import { StyledModal } from '../../../../../tt-components/Modal';
import { useAsync } from '../../../../../hooks/useAsync';
import { CalculatorResponse, NodeResponse } from '../../../../../../myApi';

const ModalDeregister = ({ visible, setVisible, device }: any) => {
  const handleCancel = () => {
    setVisible(false);
  };

  if (!device) {
    return null;
  }

  return (
    <StyledModal
      visible={visible}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCalculatorDeregisterForm
        handleCancel={handleCancel}
        device={device}
      />
    </StyledModal>
  );
};

export default ModalDeregister;
