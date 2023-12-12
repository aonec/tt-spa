import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { editElectricNodeService } from './editElectricNodeService.model';
import { EditElectricNodePage } from './view/EditElectricNodePage';

const { gates, outputs, inputs } = editElectricNodeService;
const { NodeIdGate } = gates;

export const EditElectricNodeContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const device = useStore(outputs.$electricNode);
  const isLoadingUpdate = useStore(outputs.$isLoadingUpdate);
  const isLoadingDevice = useStore(outputs.$isLoadingDevice);

  const handleUpdateDevice = useEvent(inputs.updateDevice);

  const navigate =  useNavigate();

  useEffect(
    () =>
      inputs.handleSuccessUpdateDevice.watch(() => navigate(-1))
        .unsubscribe,
    [navigate],
  );

  return (
    <>
      <NodeIdGate deviceId={Number(deviceId)} />
      <EditElectricNodePage
        device={device}
        handleUpdateDevice={handleUpdateDevice}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingDevice={isLoadingDevice}
      />
    </>
  );
};
