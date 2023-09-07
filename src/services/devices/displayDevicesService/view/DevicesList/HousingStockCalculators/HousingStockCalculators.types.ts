import { BuildingByFilterResponse } from 'api/types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import {
  DevicesByAddressInterface,
  NodesListRequestPayload,
} from 'services/devices/displayDevicesService/displayDevicesService.types';

export type HousingStockCalculatorsProps = {
  housingStockDevices: DevicesByAddressInterface;
  housingStocksAddressForSwitcher?: BuildingByFilterResponse;
  setAddressBySwither: (address: NodesListRequestPayload) => void;
  mainFilterSearchType: DevicesSearchType;
  setMainFilterSearchType: (type: DevicesSearchType) => void;
};
