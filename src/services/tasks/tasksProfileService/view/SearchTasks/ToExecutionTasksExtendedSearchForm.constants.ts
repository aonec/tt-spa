import { EManagingFirmTaskFilterType } from 'myApi';
import { taskCategotiesProps } from './SearchTasks.types';

export const taskCategories: taskCategotiesProps = {
  All: Object.keys(
    EManagingFirmTaskFilterType,
  ) as Partial<EManagingFirmTaskFilterType>[],
  Node: [
    EManagingFirmTaskFilterType.CalculatorMalfunctionAny,
    EManagingFirmTaskFilterType.HousingDeviceMalfunctionAny,
    EManagingFirmTaskFilterType.CalculatorLackOfConnection,
    EManagingFirmTaskFilterType.MeasurementErrorAny,
  ],
  IndividualDevice: [
    EManagingFirmTaskFilterType.IndividualDeviceCheck,
    EManagingFirmTaskFilterType.IndividualDeviceReadingsCheck,
    EManagingFirmTaskFilterType.IndividualDeviceCheckNoReadings,
    EManagingFirmTaskFilterType.RiserNoReadings,
  ],
  HouseNetwork: [EManagingFirmTaskFilterType.PipeRupture],
};
