import React, { FC, useCallback } from 'react';
import { useStore } from 'effector-react';
import { SwitchHousingMeteringDeviceRequest } from 'myApi';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { switchDeviceService } from './switchDeviceService.model';
import { SwitchDeviceForm } from './view/SwitchDeviceForm';

const { outputs, gates } = switchDeviceService;
const { CalculatorInfosGate } = gates;

export const SwitchDeviceContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const device = useStore(outputs.$device);
  const calculatorInfos = useStore(outputs.$calculatorInfos);

  const isCalculator = device?.type === 'Calculator';

  const handleChangeSwitchDevicePayload = useCallback(
    (payload: Omit<SwitchHousingMeteringDeviceRequest, 'deviceId'>) => {
      if (!device) return;

      const key = isCalculator
        ? 'calculatorSwitch'
        : 'housingMeteringDeviceSwitch';

      handleChange({
        [key]: {
          ...payload,
          deviceId: device.id,
          connection: device.connection,
        },
      });
    },
    [device, handleChange],
  );

  if (!device) return null;

  return (
    <>
      <CalculatorInfosGate />
      <SwitchDeviceForm
        device={device}
        handleChangeSwitchDevicePayload={handleChangeSwitchDevicePayload}
        isCalculator={isCalculator}
        calculatorInfos={calculatorInfos}
      />
    </>
  );
};
