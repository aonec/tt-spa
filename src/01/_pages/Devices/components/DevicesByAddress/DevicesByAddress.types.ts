import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { HousingByFilterResponse } from 'myApi';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { DevicesByAddressInterface } from '../utils/groupDevicesByObjects';

export type DevicesByAddressPropsInterface = {
  addressDevicesGroup: DevicesByAddressInterface;
  housingsByFilter?: HousingByFilterResponse;
  setAddress: (address: CalculatorsListRequestPayload) => void;
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
};
