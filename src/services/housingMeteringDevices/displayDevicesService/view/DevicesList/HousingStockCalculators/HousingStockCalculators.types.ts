import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { HousingByFilterResponse } from 'myApi';
import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';
import { DevicesByAddressInterface } from 'services/housingMeteringDevices/displayDevicesService/displayDevicesService.types';

export type HousingStockCalculatorsProps = {
  housingStockDevices: DevicesByAddressInterface;
  housingStocksAddressForSwitcher?: HousingByFilterResponse;
  setAddressBySwither: (address: CalculatorsListRequestPayload) => void;
  mainFilterSearchType: DevicesSearchType;
  setMainFilterSearchType: (type: DevicesSearchType) => void;
};