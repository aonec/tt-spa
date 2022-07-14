import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { сhangeODPUService } from './сhangeODPUService.model';
import { ChangeODPUPage } from './view/ChangeODPUPage';

const { gates, outputs, inputs } = сhangeODPUService;
const { OldDeviceIdGate } = gates;

export const ChangeODPUContainer = () => {
  const { oldDeviceId } = useParams<{ oldDeviceId: string }>();
  const history = useHistory();

  const oldDevice = useStore(outputs.$oldDevice);
  const isLoadingDevice = useStore(outputs.$isLoadingDevice);
  const isLoadingSwitch = useStore(outputs.$isLoadingSwitch);

  const handleSwitchDevice = useEvent(inputs.switchHousingMeteringDevice);

  useEffect(
    () =>
      inputs.switchHousingMeteringDeviceFx.doneData.watch(() =>
        history.goBack()
      ).unsubscribe,
    []
  );

  return (
    <>
      <OldDeviceIdGate oldDeviceId={Number(oldDeviceId)} />
      <ChangeODPUPage
        oldDevice={oldDevice}
        isLoadingDevice={isLoadingDevice}
        isLoadingSwitch={isLoadingSwitch}
        handleSwitchDevice={handleSwitchDevice}
      />
    </>
  );
};
