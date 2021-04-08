import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import ModalAddNodeForm from './components/ModalAddNodeForm';
import { AddNodeContext } from '../../AddNodeContext';

const ModalAddNode = () => {
  const { nodeModalVisible, setNodeModalVisible } = useContext(AddNodeContext);

  return (
    <StyledModal
      onCancel={() => {
        setNodeModalVisible(false);
      }}
      footer={null}
      width={800}
      visible={nodeModalVisible}
    >
      <ModalAddNodeForm />
    </StyledModal>
  );
};

export default ModalAddNode;
