import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { CalculatorListResponse, HousingStockAddressResponse } from 'myApi';

export type DevicesListContainerProps = {
  setAddress: (address: CalculatorsListRequestPayload) => void;
};

export interface DevicesByAddressInterface {
  devices: CalculatorListResponse[];
  address?: HousingStockAddressResponse | null;
}
