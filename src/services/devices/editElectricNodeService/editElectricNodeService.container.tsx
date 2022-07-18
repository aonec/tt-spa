import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editElectricNodeService } from './editElectricNodeService.model';
import { EditElectricNodePageGrouptype } from './editElectricNodeService.types';
import { EditElectricNodePage } from './view/EditElectricNodePage';

const { gates, outputs, inputs } = editElectricNodeService;
const { NodeIdGate } = gates;

export const EditElectricNodeContainer = () => {
  const { deviceId, grouptype } = useParams<{ deviceId: string, grouptype: EditElectricNodePageGrouptype }>();
  const device = useStore(outputs.$electricNode);
  const isLoadingUpdate = useStore(outputs.$isLoadingUpdate);
  const isLoadingDevice = useStore(outputs.$isLoadingDevice);

  const handleUpdateDevice = useEvent(inputs.updateDevice);

  return (
    <>
      <NodeIdGate deviceId={Number(deviceId)} />
      <EditElectricNodePage
        device={device}
        handleUpdateDevice={handleUpdateDevice}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingDevice={isLoadingDevice}
        grouptype={grouptype}
      />
    </>
  );
};
