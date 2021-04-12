import React, { Dispatch, SetStateAction } from 'react';
import ModalCheckForm from './ModalCheckForm';
import {
  CalculatorResponse,
  HousingMeteringDeviceResponse,
} from '../../../myApi';
import { StyledModal } from '../../tt-components/Modal';

interface ModalCheckFormInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  device: CalculatorResponse | HousingMeteringDeviceResponse;
}

const ModalCheckDevice = ({
  visible,
  setVisible,
  device,
}: ModalCheckFormInterface) => {
  const handleCancel = () => {
    if (setVisible === undefined) return;
    setVisible(false);
  };

  return (
    <StyledModal
      visible={visible}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalCheckForm handleCancel={handleCancel} device={device} />
    </StyledModal>
  );
};

export default ModalCheckDevice;
