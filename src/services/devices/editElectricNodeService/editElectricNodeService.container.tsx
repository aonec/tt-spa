import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editElectricNodeService } from './editElectricNodeService.model';
import { EditElectricNodePage } from './view/EditElectricNodePage';

const { gates, outputs } = editElectricNodeService;
const { NodeIdGate } = gates;

export const EditElectricNodeContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const device = useStore(outputs.$electricNode);

  return (
    <>
      <NodeIdGate deviceId={Number(deviceId)} />
      {device && <EditElectricNodePage device={device} />}
    </>
  );
};
