import { IndividualDeviceListItemResponse } from 'myApi';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';

export type ApartmentIndividualDevicesMetersProps = {
  individualDevicesList: IndividualDeviceListItemResponse[];
  isLoading: boolean;
  isShowClosedDevices: boolean;
  setIsShowClosedDevices: (value: boolean) => void;
  closedDevicesCount: number | null;
  sliderIndex: number;
  upSliderIndex: () => void;
  downSliderIndex: () => void;
  openReadingsHistoryModal: (deviceId: number) => void;
  managementFirmConsumptionRates: ConsumptionRatesDictionary | null;
};
