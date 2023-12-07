import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editElectricNodeService } from './editElectricNodeService.model';
import { EditElectricNodePage } from './view/EditElectricNodePage';

const { gates, outputs, inputs } = editElectricNodeService;
const { NodeIdGate } = gates;

export const EditElectricNodeContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { device, handleUpdateDevice, isLoadingDevice, isLoadingUpdate } =
    useUnit({
      device: outputs.$electricNode,
      isLoadingUpdate: outputs.$isLoadingUpdate,
      isLoadingDevice: outputs.$isLoadingDevice,
      handleUpdateDevice: inputs.updateDevice,
    });

  const history = useHistory();

  useEffect(
    () =>
      inputs.handleSuccessUpdateDevice.watch(() => history.goBack())
        .unsubscribe,
    [history],
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
