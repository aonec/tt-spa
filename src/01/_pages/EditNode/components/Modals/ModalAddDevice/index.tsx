import React, { Dispatch, SetStateAction } from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from './ModalAddDeviceForm';
import { CalculatorResponse, PipeNodeResponse } from '../../../../../../myApi';

interface ModalAddDeviceInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  node: PipeNodeResponse;
  // calculator: CalculatorResponse;
}

const ModalAddDevice = ({
  visible,
  setVisible,
  // calculator,
  node,
}: ModalAddDeviceInterface) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <StyledModal
      visible={visible}
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <ModalAddDeviceForm
        handleCancel={handleCancel}
        // calculator={calculator}
        node={node}
        setVisible={setVisible}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
