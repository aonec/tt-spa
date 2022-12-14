import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editHousingMeteringDeviceService } from './editHousingMeteringDeviceService.model';
import { EditHousingMeteringDevicePage } from './view/EditHousingMeteringDevicePage';

const { inputs, outputs, gates } = editHousingMeteringDeviceService;
const { FetchHousingMeteringDeviceGate } = gates;

export const EditHousingMeteringDeviceContainer = () => {
  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleSubmitForm = useEvent(inputs.handleSubmitForm);

  const currentTab = useStore(outputs.$currentTab);
  const housingMeteringDevice = useStore(outputs.$housingMeteringDevice);

  const { deviceId } = useParams<{ deviceId: string }>();

  return (
    <>
      <FetchHousingMeteringDeviceGate deviceId={Number(deviceId)} />

      <EditHousingMeteringDevicePage
        handleChangeTab={handleChangeTab}
        currentTab={currentTab}
        housingMeteringDevice={housingMeteringDevice}
        handleSubmitForm={handleSubmitForm}
        deviceId={deviceId}
      />
    </>
  );
};
