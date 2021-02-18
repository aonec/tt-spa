import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { AddNodeContext } from '../../index';

const ModalAddNode = (props) => {
  const { addNode, setAddNode} = useContext(AddNodeContext);
  function handleCancel() {
    setAddNode(false);
  }
  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addNode}
    >
      <AddDeviceForm
        handleCancel={handleCancel}
      />
    </StyledModal>
  );
};

export default ModalAddNode;


