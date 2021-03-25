import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Modal } from 'antd';
import ModalDeregisterForm from './ModalDeregisterForm';
import { HousingMeteringDeviceResponse } from '../../../../../../myApi';
import { StyledModal } from '../../../../../tt-components';

interface DeregisterDeviceInterface {
  deregister: boolean;
  setDeregister: Dispatch<SetStateAction<boolean>>;
  device: HousingMeteringDeviceResponse;
}

const DeregisterDevice = ({
  deregister,
  setDeregister,
  device,
}: DeregisterDeviceInterface) => {
  const handleCancel = () => {
    setDeregister(false);
  };

  if (device) {
    return (
      <StyledModal
        visible={deregister}
        width={800}
        footer={null}
        onCancel={handleCancel}
      >
        <ModalDeregisterForm
          handleCancel={handleCancel}
          device={device}
          deregister={deregister}
          setDeregister={setDeregister}
        />
      </StyledModal>
    );
  }

  return <div>ЗАГРУЗКА ДАННЫХ</div>;
};

export default DeregisterDevice;
