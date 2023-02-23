import React, { Dispatch, SetStateAction } from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from './ModalAddDeviceForm';
import { PipeNodeResponse } from '../../../../../../myApi';

interface ModalAddDeviceInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  node: PipeNodeResponse;
  refetchNode: () => void;
}

const ModalAddDevice = ({
  visible,
  setVisible,
  node,
  refetchNode,
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
        node={node}
        setVisible={setVisible}
        refetchNode={refetchNode}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
