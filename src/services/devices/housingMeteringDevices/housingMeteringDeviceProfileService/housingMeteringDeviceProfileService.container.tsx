import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { housingMeteringDeviceProfileService } from './housingMeteringDeviceProfileService.model';
import { HousingMeteringDeviceProfile } from './view/HousingMeteringDeviceProfile';

const { inputs, outputs, gates } = housingMeteringDeviceProfileService;
const { FetchHousingMeteringDeviceGate } = gates;

export const HousingMeteringDeviceProfileContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const housingMeteringDevice = useStore(outputs.$housingMeteringDevice);
  const housingMeteringDeviceTasks = useStore(
    outputs.$housingMeteringDeviceTask
  );

  const currentTab = useStore(outputs.$currentTab);

  const handleChangeTab = useEvent(inputs.handleChangeTab);

  console.log(housingMeteringDevice);

  return (
    <>
      <FetchHousingMeteringDeviceGate deviceId={Number(deviceId)} />

      <HousingMeteringDeviceProfile
        deviceId={deviceId}
        housingMeteringDevice={housingMeteringDevice}
        currentTab={currentTab}
        handleChangeTab={handleChangeTab}
        housingMeteringDeviceTasks={housingMeteringDeviceTasks}
      />
    </>
  );
};
