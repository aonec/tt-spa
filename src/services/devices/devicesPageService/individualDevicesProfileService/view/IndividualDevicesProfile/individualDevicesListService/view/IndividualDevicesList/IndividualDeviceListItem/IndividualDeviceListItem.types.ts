import { IndividualDeviceResponseFromDevicePage } from 'myApi';

export type IndividualDeviceListItemProps = {
  device: IndividualDeviceResponseFromDevicePage;
  apartmentId?: number;
  housingStockId?: number;
  consumptionData: Consumption[];
};

export type Consumption = {
  consumption: number;
  date: string;
};
