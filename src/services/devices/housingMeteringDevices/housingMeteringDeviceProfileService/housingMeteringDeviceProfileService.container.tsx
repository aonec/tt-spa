import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { housingMeteringDeviceProfileService } from './housingMeteringDeviceProfileService.model';
import { HousingMeteringDeviceProfile } from './view/HousingMeteringDeviceProfile';

const { inputs, outputs, gates } = housingMeteringDeviceProfileService;
const { FetchHousingMeteringDeviceGate } = gates;

export const HousingMeteringDeviceProfileContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const handleChangeTab = useEvent(inputs.handleChangeTab);

  const housingMeteringDevice = useStore(outputs.$housingMeteringDevice);
  const housingMeteringDeviceTasks = useStore(
    outputs.$housingMeteringDeviceTask
  );

  const currentTab = useStore(outputs.$currentTab);

  const pending = useStore(outputs.$pending);

  return (
    <>
      <FetchHousingMeteringDeviceGate deviceId={Number(deviceId)} />
      <WithLoader isLoading={pending}>
        <HousingMeteringDeviceProfile
          deviceId={deviceId}
          housingMeteringDevice={housingMeteringDevice}
          currentTab={currentTab}
          handleChangeTab={handleChangeTab}
          housingMeteringDeviceTasks={housingMeteringDeviceTasks}
        />
      </WithLoader>
    </>
  );
};
