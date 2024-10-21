import { ManagingFirmTaskType } from 'api/types';
import { ReactNode } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';

export const MalfunctionIcons: { [key in ManagingFirmTaskType]: ReactNode } = {
  [ManagingFirmTaskType.CalculatorLackOfConnection]: <CalculatorIcon />,
  [ManagingFirmTaskType.CalculatorMalfunction]: <CalculatorIcon />,
  [ManagingFirmTaskType.CalculatorMalfunctionNonCommercial]: <CalculatorIcon />,
  [ManagingFirmTaskType.CurrentApplication]: <CalculatorIcon />,
  [ManagingFirmTaskType.CurrentApplicationUnassigned]: <CalculatorIcon />,
  [ManagingFirmTaskType.EmergencyApplication]: <CalculatorIcon />,
  [ManagingFirmTaskType.EmergencyApplicationUnassigned]: <CalculatorIcon />,
  [ManagingFirmTaskType.HousingDeviceMalfunction]: <CalculatorIcon />,
  [ManagingFirmTaskType.HousingDeviceMalfunctionNonCommercial]: (
    <CalculatorIcon />
  ),
  [ManagingFirmTaskType.IndividualDeviceCheck]: <CalculatorIcon />,
  [ManagingFirmTaskType.IndividualDeviceCheckNoReadings]: <CalculatorIcon />,
  [ManagingFirmTaskType.IndividualDeviceReadingsCheck]: <CalculatorIcon />,
  [ManagingFirmTaskType.MeasurementErrorCommercial]: <CalculatorIcon />,
  [ManagingFirmTaskType.MeasurementErrorNonCommercial]: <CalculatorIcon />,
  [ManagingFirmTaskType.PipeRupture]: <CalculatorIcon />,
  [ManagingFirmTaskType.ResourceDisconnecting]: <CalculatorIcon />,
  [ManagingFirmTaskType.RiserNoReadings]: <CalculatorIcon />,
  [ManagingFirmTaskType.TemperatureNormativeDeviation]: <CalculatorIcon />,
};
