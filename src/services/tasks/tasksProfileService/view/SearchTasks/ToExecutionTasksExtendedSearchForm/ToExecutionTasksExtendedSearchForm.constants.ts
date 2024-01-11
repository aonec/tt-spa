import {
  EManagingFirmTaskFilterType,
  ETaskEngineeringElement,
} from 'api/types';

export const taskCategories: {
  [key in ETaskEngineeringElement]: EManagingFirmTaskFilterType[];
} = {
  Node: [
    EManagingFirmTaskFilterType.CalculatorMalfunctionAny,
    EManagingFirmTaskFilterType.HousingDeviceMalfunctionAny,
    EManagingFirmTaskFilterType.CalculatorLackOfConnection,
    EManagingFirmTaskFilterType.MeasurementErrorAny,
    EManagingFirmTaskFilterType.TemperatureNormativeDeviation,
  ],
  IndividualDevice: [
    EManagingFirmTaskFilterType.IndividualDeviceCheck,
    EManagingFirmTaskFilterType.IndividualDeviceReadingsCheck,
    EManagingFirmTaskFilterType.IndividualDeviceCheckNoReadings,
    EManagingFirmTaskFilterType.RiserNoReadings,
  ],
  HouseNetwork: [EManagingFirmTaskFilterType.PipeRupture],
};
