import { useEvent, useStore, useStoreMap } from 'effector-react';
import React from 'react';
import { meteringDevicesService } from './meteringDevicesService.model';
import { MeteringDevicesListModal } from './view/MeteringDevicesListModal';

const { inputs, outputs } = meteringDevicesService;

export const MeteringDevicesContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const isLoading = useStore(outputs.$isLoading);
  const meterindDevicesList = useStore(outputs.$meterindDevicesList);
  const pipeNode = useStore(outputs.$pipeNode);

  const closeDevicesListModal = useEvent(inputs.closeDevicesListModal);

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
