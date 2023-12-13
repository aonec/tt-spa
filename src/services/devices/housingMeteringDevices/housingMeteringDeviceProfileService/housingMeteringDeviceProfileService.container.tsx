import { useUnit } from 'effector-react';
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { housingMeteringDeviceProfileService } from './housingMeteringDeviceProfileService.model';
import { HousingMeteringDeviceProfile } from './view/HousingMeteringDeviceProfile';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';
import { HousingProfileTabs } from './housingMeteringDeviceProfileService.types';

const { inputs, outputs, gates } = housingMeteringDeviceProfileService;
const { FetchHousingMeteringDeviceGate } = gates;

export const HousingMeteringDeviceProfileContainer = () => {
  const { deviceId, section } = useParams<{
    deviceId: string;
    section?: HousingProfileTabs;
  }>();

  const navigate = useNavigate();

  const {
    handleCheckModalOpen,
    handleDeviceClosingModalOpen,
    housingMeteringDevice,
    housingMeteringDeviceTasks,
    pending,
    tasksPending,
  } = useUnit({
    handleCheckModalOpen: inputs.handleCheckModalOpen,
    handleDeviceClosingModalOpen: inputs.handleDeviceClosingModalOpen,
    housingMeteringDevice: outputs.$housingMeteringDevice,
    housingMeteringDeviceTasks: outputs.$housingMeteringDeviceTask,
    pending: outputs.$pending,
    tasksPending: outputs.$tasksPending,
  });

  const isPermitionToCheckHousingMeteringDevice = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);
  const isPermitionToCloseHousingMeteringDevice =
    isPermitionToCheckHousingMeteringDevice;
  const isPermitionToEditHousingMeteringDevice = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.Operator,
  ]);

  const setGrouptype = useCallback(
    (section: HousingProfileTabs) =>
      navigate(`/housingMeteringDevices/${deviceId}/profile/${section}`, {
        replace: true,
      }),
    [navigate, deviceId],
  );

  if (!deviceId) return null;

  return (
    <>
      <FetchHousingMeteringDeviceGate deviceId={Number(deviceId)} />
      <WithLoader isLoading={pending}>
        <HousingMeteringDeviceProfile
          deviceId={deviceId}
          housingMeteringDevice={housingMeteringDevice}
          currentTab={section}
          handleChangeTab={setGrouptype}
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
