import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { HousingByFilterResponse } from 'myApi';
import { DevicesByAddressInterface } from '../utils/groupDevicesByObjects';

export type DevicesByAddressPropsInterface = {
  addressDevicesGroup: DevicesByAddressInterface;
  housingsByFilter?: HousingByFilterResponse;
  setAddress: (address: CalculatorsListRequestPayload) => void;
};
