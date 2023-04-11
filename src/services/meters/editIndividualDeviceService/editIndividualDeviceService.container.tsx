import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { editIndividualDeviceService } from './editIndividualDeviceService.model';
import { EditIndividualPage } from './EditIndividualPage';
import { useParams } from 'react-router-dom';

const { inputs, outputs, gates } = editIndividualDeviceService;
const { FetchIndividualDeviceGate } = gates;

export const EditIndividualDeviceContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const handleChangeTab = useEvent(inputs.handleChangeTab);
  const handleUpdateDevice = useEvent(inputs.handleUpdateDevice);

  const currentTab = useStore(outputs.$currentTab);
  const individualDevice = useStore(outputs.$individualDevice);
  const isDeviceLoading = useStore(outputs.$isDeviceLoading);

  return (
    <>
      <FetchIndividualDeviceGate deviceId={Number(deviceId)} />

      <EditIndividualPage
        handleChangeTab={handleChangeTab}
        currentTab={currentTab}
        individualDevice={individualDevice}
        isDeviceLoading={isDeviceLoading}
        handleUpdateDevice={handleUpdateDevice}
      />
    </>
  );
};
