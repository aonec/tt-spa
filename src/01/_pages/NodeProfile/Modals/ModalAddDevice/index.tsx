import React, { useContext } from 'react';
import { StyledModal } from '../../../../tt-components/Modal';
import AddDeviceForm from './components/AddDeviceForm';
import { NodeContext} from '../../index';

const ModalAddDevice = (props) => {
  const { setAddOdpu, addOdpu} = useContext(NodeContext);
  function handleCancel() {
    setAddOdpu(false);
  }
  return (
    <StyledModal
      onCancel={handleCancel}
      footer={null}
      width={800}
      visible={addOdpu}
    >
      <AddDeviceForm
        handleCancel={handleCancel}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;

