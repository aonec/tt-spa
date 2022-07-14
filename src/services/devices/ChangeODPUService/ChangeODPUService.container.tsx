import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ChangeODPUService } from './ChangeODPUService.model';
import { ChangeODPUPage } from './view/ChangeODPUPage';

const { gates, outputs } = ChangeODPUService;
const { OldDeviceIdGate } = gates;

export const ChangeODPUContainer = () => {
  const { oldDeviceId } = useParams<{ oldDeviceId: string }>();

  const oldDevice = useStore(outputs.$oldDevice);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      <OldDeviceIdGate oldDeviceId={Number(oldDeviceId)} />
      <ChangeODPUPage oldDevice={oldDevice} isLoading={isLoading} />
    </>
  );
};
