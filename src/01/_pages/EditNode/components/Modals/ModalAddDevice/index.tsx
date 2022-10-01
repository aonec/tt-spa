import React, { Dispatch, SetStateAction } from 'react';
import { StyledModal } from '../../../../../tt-components/Modal';
import ModalAddDeviceForm from './ModalAddDeviceForm';
import {
  EMagistralTypeStringDictionaryItem,
  PipeNodeResponse,
} from '../../../../../../myApi';

interface ModalAddDeviceInterface {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  node: PipeNodeResponse;
  magistrals: EMagistralTypeStringDictionaryItem[];
}

const ModalAddDevice = ({
  visible,
  setVisible,
  node,
  magistrals,
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
        magistrals={magistrals}
        node={node}
        setVisible={setVisible}
      />
    </StyledModal>
  );
};

export default ModalAddDevice;
