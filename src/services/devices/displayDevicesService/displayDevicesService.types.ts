import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { BuildingShortResponse, CalculatorListResponse } from 'api/types';

export type DevicesListContainerProps = {
  setAddress: (address: CalculatorsListRequestPayload) => void;
};

export interface DevicesByAddressInterface {
  devices: CalculatorListResponse[];
  building: BuildingShortResponse | null;
}
