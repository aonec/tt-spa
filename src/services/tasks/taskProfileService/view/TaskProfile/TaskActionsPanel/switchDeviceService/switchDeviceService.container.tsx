import { useStore } from 'effector-react';
import { SwitchHousingMeteringDeviceRequest } from 'myApi';
import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { switchDeviceService } from './switchDeviceService.model';
import { SwitchDeviceForm } from './view/SwitchDeviceForm';

const { outputs, gates } = switchDeviceService;
const { DevicePipeGate } = gates;

export const SwitchDeviceContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const device = useStore(outputs.$device);
  const devicePipe = useStore(outputs.$devicePipe);

  const handleChangeSwitchDevicePayload = useCallback(
    (payload: Omit<SwitchHousingMeteringDeviceRequest, 'deviceId'>) => {
      if (!device) return;

      handleChange({
        housingMeteringDeviceSwitch: { ...payload, deviceId: device.id },
      });
    },
    [device, handleChange]
  );

  if (!device) return null;

  return (
    <>
      {device && <DevicePipeGate deviceId={device.id} />}
      <SwitchDeviceForm
        device={device}
        devicePipe={devicePipe}
        handleChangeSwitchDevicePayload={handleChangeSwitchDevicePayload}
      />
    </>
  );
};
