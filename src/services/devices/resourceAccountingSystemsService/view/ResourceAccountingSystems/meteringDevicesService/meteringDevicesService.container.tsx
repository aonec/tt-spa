import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { meteringDevicesService } from './meteringDevicesService.model';
import { MeteringDevicesListModal } from './view/MeteringDevicesListModal';

const { inputs, outputs } = meteringDevicesService;

export const MeteringDevicesContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  console.log(isModalOpen)

  const isLoading = useStore(outputs.$isLoading);
  const meterindDevicesList = useStore(outputs.$meterindDevicesList);
  console.log(meterindDevicesList)
  const pipeNode = useStore(outputs.$pipeNode);

  const closeDevicesListModal = useEvent(inputs.closeDevicesListModal);

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
