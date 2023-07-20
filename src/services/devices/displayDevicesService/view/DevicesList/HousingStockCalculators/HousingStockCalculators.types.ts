import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { HousingByFilterResponse } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { DevicesByAddressInterface } from 'services/devices/displayDevicesService/displayDevicesService.types';

export type HousingStockCalculatorsProps = {
  housingStockDevices: DevicesByAddressInterface;
  housingStocksAddressForSwitcher?: HousingByFilterResponse;
  setAddressBySwither: (address: CalculatorsListRequestPayload) => void;
  mainFilterSearchType: DevicesSearchType;
  setMainFilterSearchType: (type: DevicesSearchType) => void;
};
