import React, { Dispatch, SetStateAction, useContext } from 'react';
import ModalCheckForm from './ModalCheckForm';
import { StyledModal } from '../../../../../tt-components/Modal';
import { CalculatorResponse } from '../../../../../../myApi';

interface ModalCheckFormInterface {
  check: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
  device: CalculatorResponse;
}

const CheckDevice = ({ check, setCheck, device }: ModalCheckFormInterface) => {
  const handleCancel = () => {
    if (setCheck === undefined) return;
    setCheck(false);
  };

  return (
    <StyledModal
      visible={check}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCheckForm handleCancel={handleCancel} device={device} />
    </StyledModal>
  );
};

export default CheckDevice;
