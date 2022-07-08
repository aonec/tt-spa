import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ChangeODPUService } from './ChangeODPUService.model';
import { ChangeODPUPage } from './view/ChangeODPUPage';

const { gates, outputs  } = ChangeODPUService;

export const ChangeODPUContainer = () => {
  const { oldDeviceId } = useParams<{ oldDeviceId: string }>();
  const { OldDeviceIdGate } = gates;
  const oldDevice = useStore(outputs.$oldDevice);

  return (
    <>
      <OldDeviceIdGate oldDeviceId={Number(oldDeviceId)} />
      <ChangeODPUPage oldDevice={oldDevice}/>
    </>
  );
};
