import { useUnit } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { editHousingMeteringDeviceService } from './editHousingMeteringDeviceService.model';
import { EditHousingMeteringDevicePage } from './view/EditHousingMeteringDevicePage';

const { inputs, outputs, gates } = editHousingMeteringDeviceService;
const { EditMeteringDeviceGate } = gates;

export const EditHousingMeteringDeviceContainer = () => {
  const {
    communicationPipes,
    currentTab,
    handleChangeTab,
    handleSubmitForm,
    housingMeteringDevice,
    isLoading,
  } = useUnit({
    handleChangeTab: inputs.handleChangeTab,
    handleSubmitForm: inputs.handleSubmitForm,
    currentTab: outputs.$currentTab,
    housingMeteringDevice: outputs.$housingMeteringDevice,
    communicationPipes: outputs.$communicationPipes,
    isLoading: outputs.$isLoading,
  });

  const { deviceId } = useParams<{ deviceId: string }>();
  if (!deviceId) return null;

  return (
    <>
      <EditMeteringDeviceGate deviceId={Number(deviceId)} />
      <WithLoader isLoading={isLoading}>
        <EditHousingMeteringDevicePage
          handleChangeTab={handleChangeTab}
          currentTab={currentTab}
          housingMeteringDevice={housingMeteringDevice}
          handleSubmitForm={handleSubmitForm}
          deviceId={deviceId}
          communicationPipes={communicationPipes}
        />
      </WithLoader>
    </>
  );
};
