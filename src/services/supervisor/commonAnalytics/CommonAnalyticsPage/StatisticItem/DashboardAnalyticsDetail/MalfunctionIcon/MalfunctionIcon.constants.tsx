import { ManagingFirmTaskType } from 'api/types';
import { ReactNode } from 'react';
import {
  CalculatorIcon,
  IndividualDeviceSmallIcon,
  MeasurementSmallIcon,
  NoConnectionIcon,
} from 'ui-kit/icons';
import {
  CalculatorIconSC,
  IndividualDeviceSmallIconSC,
  MeasurementSmallIconSC,
  NoConnectionIconSC,
} from './MalfunctionIcon.styled';

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

export const MalfunctionWhiteIcons: {
  [key in ManagingFirmTaskType]: ReactNode;
} = {
  [ManagingFirmTaskType.CalculatorLackOfConnection]: <NoConnectionIconSC />,
  [ManagingFirmTaskType.CalculatorMalfunction]: <CalculatorIconSC />,
  [ManagingFirmTaskType.CalculatorMalfunctionNonCommercial]: (
    <CalculatorIconSC />
  ),
  [ManagingFirmTaskType.CurrentApplication]: <CalculatorIconSC />,
  [ManagingFirmTaskType.CurrentApplicationUnassigned]: <CalculatorIconSC />,
  [ManagingFirmTaskType.EmergencyApplication]: <CalculatorIconSC />,
  [ManagingFirmTaskType.EmergencyApplicationUnassigned]: <CalculatorIconSC />,
  [ManagingFirmTaskType.HousingDeviceMalfunction]: <CalculatorIconSC />,
  [ManagingFirmTaskType.HousingDeviceMalfunctionNonCommercial]: (
    <CalculatorIconSC />
  ),
  [ManagingFirmTaskType.IndividualDeviceCheck]: <IndividualDeviceSmallIconSC />,
  [ManagingFirmTaskType.IndividualDeviceCheckNoReadings]: (
    <IndividualDeviceSmallIconSC />
  ),
  [ManagingFirmTaskType.IndividualDeviceReadingsCheck]: (
    <IndividualDeviceSmallIconSC />
  ),
  [ManagingFirmTaskType.MeasurementErrorCommercial]: <MeasurementSmallIconSC />,
  [ManagingFirmTaskType.MeasurementErrorNonCommercial]: (
    <MeasurementSmallIconSC />
  ),
  [ManagingFirmTaskType.PipeRupture]: <CalculatorIconSC />,
  [ManagingFirmTaskType.ResourceDisconnecting]: <CalculatorIconSC />,
  [ManagingFirmTaskType.RiserNoReadings]: <CalculatorIconSC />,
  [ManagingFirmTaskType.TemperatureNormativeDeviation]: <CalculatorIconSC />,
};

export const MalfunctionDescription: { [key: string]: string } = {
  [ManagingFirmTaskType.CalculatorLackOfConnection]:
    'Отсутствие подключения с прибором',
  [ManagingFirmTaskType.CalculatorMalfunction]: 'Неполадки с вычислителем',
  [ManagingFirmTaskType.HousingDeviceMalfunction]: 'Неполадки с ОДПУ',
  [ManagingFirmTaskType.MeasurementErrorCommercial]:
    'Превышение погрешности измерения',
};
