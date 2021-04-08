import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddNodeForm from './components/AddNodeForm';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddNode = () => {
  const { addNode, setAddNode } = useContext(AddNodeContext);
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
      <AddNodeForm handleCancel={handleCancel} />
    </StyledModal>
  );
};

export default ModalAddNode;
