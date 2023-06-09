import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { CalculatorListResponse, HousingStockAddressResponse } from 'myApi';

export type DevicesListContainerProps = {
  setAddress: (address: CalculatorsListRequestPayload) => void;
};

export interface DevicesByAddressInterface {
  devices: CalculatorListResponse[];
  address?: HousingStockAddressResponse | null;
}