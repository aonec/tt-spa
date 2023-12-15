import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { сhangeODPUService } from './сhangeODPUService.model';
import { ChangeODPUPage } from './view/ChangeODPUPage';

const { gates, outputs, inputs } = сhangeODPUService;
const { OldDeviceIdGate } = gates;

export const ChangeODPUContainer = () => {
  const { oldDeviceId } = useParams<{ oldDeviceId: string }>();
  const navigate = useNavigate();

  const { handleSwitchDevice, isLoadingDevice, isLoadingSwitch, oldDevice } =
    useUnit({
      oldDevice: outputs.$oldDevice,
      isLoadingDevice: outputs.$isLoadingDevice,
      isLoadingSwitch: outputs.$isLoadingSwitch,
      handleSwitchDevice: inputs.switchHousingMeteringDevice,
    });

  useEffect(
    () =>
      inputs.switchHousingMeteringDeviceFx.doneData.watch(() => navigate(-1))
        .unsubscribe,
    [navigate],
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
