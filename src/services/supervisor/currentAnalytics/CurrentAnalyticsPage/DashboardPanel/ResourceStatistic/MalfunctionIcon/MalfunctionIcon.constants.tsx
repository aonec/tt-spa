import { ManagingFirmTaskType } from 'api/types';
import { ReactNode } from 'react';
import {
  CalculatorIcon,
  IndividualDeviceSmallIcon,
  MeasurementSmallIcon,
  NoConnectionIcon,
} from 'ui-kit/icons';

export const MalfunctionIcons: { [key in ManagingFirmTaskType]: ReactNode } = {
  [ManagingFirmTaskType.CalculatorLackOfConnection]: <NoConnectionIcon />,
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
  [ManagingFirmTaskType.IndividualDeviceCheck]: <IndividualDeviceSmallIcon />,
  [ManagingFirmTaskType.IndividualDeviceCheckNoReadings]: (
    <IndividualDeviceSmallIcon />
  ),
  [ManagingFirmTaskType.IndividualDeviceReadingsCheck]: (
    <IndividualDeviceSmallIcon />
  ),
  [ManagingFirmTaskType.MeasurementErrorCommercial]: <MeasurementSmallIcon />,
  [ManagingFirmTaskType.MeasurementErrorNonCommercial]: (
    <MeasurementSmallIcon />
  ),
  [ManagingFirmTaskType.PipeRupture]: <CalculatorIcon />,
  [ManagingFirmTaskType.ResourceDisconnecting]: <CalculatorIcon />,
  [ManagingFirmTaskType.RiserNoReadings]: <CalculatorIcon />,
  [ManagingFirmTaskType.TemperatureNormativeDeviation]: <CalculatorIcon />,
};
