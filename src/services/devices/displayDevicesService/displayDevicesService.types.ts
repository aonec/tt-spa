import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { CalculatorListResponse, BuildingAddressResponse } from 'myApi';

export type DevicesListContainerProps = {
  setAddress: (address: CalculatorsListRequestPayload) => void;
};

export interface DevicesByAddressInterface {
  devices: CalculatorListResponse[];
  address?: BuildingAddressResponse | null;
}
