import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { CalculatorResponse, NodeResponse } from '../../../../../myApi';
import { getObjectCalculators } from './apiAddOdpu';

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

  console.log('node', node);
  useEffect(() => {
    if (calculator) {
      getObjectCalculators(calculator.address.id).then((res) => {
        console.log(res);
      });
    }
  }, [calculator]);
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
