import React, { Dispatch, SetStateAction, useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { CalculatorResponse, NodeResponse } from '../../../../../myApi';

interface ModalAddDeviceInterface {
  node: NodeResponse;
  calculator: CalculatorResponse | null;
  nodeId?: number;
  setAddDevice: Dispatch<SetStateAction<boolean>>;
  addDevice: boolean;
  handleCancel?: any;
}

const ModalAddDevice = ({
  setAddDevice,
  addDevice,
  calculator,
  node,
}: ModalAddDeviceInterface) => {
  const handleCancel = () => {
    setAddDevice(false);
  };
  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addDevice}
    >
      <AddDeviceForm
        handleCancel={handleCancel}
        calculator={calculator}
        node={node}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
