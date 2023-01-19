import { IndividualDeviceListItemResponse } from 'myApi';
import { ConsumptionRatesDictionary } from '../managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';

export type HousesIndividualDevicesMetersContainerProps = {
  individualDevicesList: IndividualDeviceListItemResponse[];
  openReadingsHistoryModal: (deviceId: number) => void;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
  loadNextPageOfIndividualDevicesList: () => void;
  allDevicesLength?: number
};
