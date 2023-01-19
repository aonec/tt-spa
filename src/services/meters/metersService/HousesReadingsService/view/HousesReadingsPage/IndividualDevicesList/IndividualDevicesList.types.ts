import { IndividualDeviceListItemResponse } from 'myApi';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';

export type IndividualDevicesListProps = {
  individualDevicesList: IndividualDeviceListItemResponse[];
  loadNextPageOfIndividualDevicesList: () => void;
  isLoadingIndividualDevices: boolean;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
  openReadingsHistoryModal: (deviceId: number) => void;
  isAllDevicesLoaded: boolean;
  allDevicesLength?: number;
};
