import { IndividualDeviceConsumptionResponse } from 'api/types';

export type IndividualDevicesListContainerProps = {
  devicesIds: number[];
  apartmentId?: number;
  housingStockId?: number;
};

export type IndividualDeviceConsumptionForGraph = {
  deviceId: number;
  consumptions: IndividualDeviceConsumptionResponse[];
};
