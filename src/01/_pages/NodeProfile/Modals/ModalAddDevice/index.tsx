import React, { Dispatch, SetStateAction, useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { CalculatorResponse, NodeResponse } from '../../../../../myApi';

interface ModalAddDeviceInterface {
  node: NodeResponse;
  calculator: CalculatorResponse | null;
  nodeId?: number;
  setAddOdpu: Dispatch<SetStateAction<boolean>>;
  addOdpu: boolean;
  handleCancel?: any;
}

const ModalAddDevice = ({
  setAddOdpu,
  addOdpu,
  calculator,
  node,
}: ModalAddDeviceInterface) => {
  const handleCancel = () => {
    setAddOdpu(false);
  };
  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
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
