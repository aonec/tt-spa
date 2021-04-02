import React, { Dispatch, SetStateAction } from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from './ModalAddDeviceForm';
import { CalculatorResponse, NodeResponse } from '../../../../../../myApi';
import Example from './ModalAddDeviceForm';

interface ModalAddDeviceInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  node: NodeResponse;
  calculator: CalculatorResponse;
}

const ModalAddDevice = ({
  visible,
  setVisible,
  calculator,
  node,
}: ModalAddDeviceInterface) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <StyledModal
      visible={true}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalAddDeviceForm
        handleCancel={handleCancel}
        calculator={calculator}
        node={node}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
