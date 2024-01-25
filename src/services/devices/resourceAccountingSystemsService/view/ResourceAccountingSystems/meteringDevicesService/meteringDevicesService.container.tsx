import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { meteringDevicesService } from './meteringDevicesService.model';
import { MeteringDevicesListModal } from './view/MeteringDevicesListModal';

const { inputs, outputs } = meteringDevicesService;

export const MeteringDevicesContainer = () => {
  const {
    closeDevicesListModal,
    isLoading,
    isModalOpen,
    meterindDevicesList,
    pipeNode,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isLoading: outputs.$isLoading,
    meterindDevicesList: outputs.$meterindDevicesList,
    pipeNode: outputs.$pipeNode,
    closeDevicesListModal: inputs.closeDevicesListModal,
  });

  useEffect(() => () => closeDevicesListModal(), [closeDevicesListModal]);

  return (
    <MeteringDevicesListModal
      isModalOpen={isModalOpen}
      isLoading={isLoading}
      meterindDevicesList={meterindDevicesList}
      closeDevicesListModal={() => closeDevicesListModal()}
      pipeNode={pipeNode}
    />
  );
};
