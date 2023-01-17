import { useStore } from 'effector-react';
import { SwitchHousingMeteringDeviceRequest } from 'myApi';
import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { switchDeviceService } from './switchDeviceService.model';
import { SwitchDeviceForm } from './view/SwitchDeviceForm';

const { outputs } = switchDeviceService;

export const SwitchDeviceContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const device = useStore(outputs.$device);

  const isCalculator = device?.type === 'Calculator';

  const handleChangeSwitchDevicePayload = useCallback(
    (payload: Omit<SwitchHousingMeteringDeviceRequest, 'deviceId'>) => {
      if (!device) return;

      const key = isCalculator
        ? 'housingMeteringDeviceSwitch'
        : 'housingMeteringDeviceSwitch';

      handleChange({
        [key]: { ...payload, deviceId: device.id },
      });
    },
    [device, handleChange]
  );

  if (!device) return null;

  return (
    <SwitchDeviceForm
      device={device}
      handleChangeSwitchDevicePayload={handleChangeSwitchDevicePayload}
      isCalculator={isCalculator}
    />
  );
};
