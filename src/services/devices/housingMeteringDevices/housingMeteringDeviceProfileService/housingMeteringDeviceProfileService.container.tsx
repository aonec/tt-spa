import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { housingMeteringDeviceProfileService } from './housingMeteringDeviceProfileService.model';
import { HousingMeteringDeviceProfile } from './view/HousingMeteringDeviceProfile';
import { ESecuredIdentityRoleName } from 'myApi';
import { usePermission } from 'hooks/usePermission';

const { inputs, outputs, gates } = housingMeteringDeviceProfileService;
const { FetchHousingMeteringDeviceGate } = gates;

export const HousingMeteringDeviceProfileContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const handleChangeTab = useEvent(inputs.handleChangeTab);

  const handleCheckModalOpen = useEvent(inputs.handleCheckModalOpen);

  const handleDeviceClosingModalOpen = useEvent(
    inputs.handleDeviceClosingModalOpen,
  );

  const housingMeteringDevice = useStore(outputs.$housingMeteringDevice);
  const housingMeteringDeviceTasks = useStore(
    outputs.$housingMeteringDeviceTask,
  );

  const currentTab = useStore(outputs.$currentTab);
  const pending = useStore(outputs.$pending);
  const tasksPending = useStore(outputs.$tasksPending);

  const isPermitionToCheckHousingMeteringDevice = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  ]);
  const isPermitionToCloseHousingMeteringDevice =
    isPermitionToCheckHousingMeteringDevice;
  const isPermitionToEditHousingMeteringDevice = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
  ]);

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
          handleCheckModalOpen={() => handleCheckModalOpen()}
          handleDeviceClosingModalOpen={() => handleDeviceClosingModalOpen()}
          tasksPending={tasksPending}
          isPermitionToCheckHousingMeteringDevice={
            isPermitionToCheckHousingMeteringDevice
          }
          isPermitionToCloseHousingMeteringDevice={
            isPermitionToCloseHousingMeteringDevice
          }
          isPermitionToEditHousingMeteringDevice={
            isPermitionToEditHousingMeteringDevice
          }
        />
      </WithLoader>
    </>
  );
};
