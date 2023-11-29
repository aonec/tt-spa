import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { сhangeODPUService } from './сhangeODPUService.model';
import { ChangeODPUPage } from './view/ChangeODPUPage';

const { gates, outputs, inputs } = сhangeODPUService;
const { OldDeviceIdGate } = gates;

export const ChangeODPUContainer = () => {
  const { oldDeviceId } = useParams<{ oldDeviceId: string }>();
  const history =  useNavigate();

  const oldDevice = useStore(outputs.$oldDevice);
  const isLoadingDevice = useStore(outputs.$isLoadingDevice);
  const isLoadingSwitch = useStore(outputs.$isLoadingSwitch);

  const handleSwitchDevice = useEvent(inputs.switchHousingMeteringDevice);

  useEffect(
    () =>
      inputs.switchHousingMeteringDeviceFx.doneData.watch(() =>
        history(-1),
      ).unsubscribe,
    [history],
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
