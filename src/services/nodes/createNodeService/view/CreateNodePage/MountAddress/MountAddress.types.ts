import { HousingStockResponse } from 'api/types';
import { UpdateNodeFormPayloadCallback } from 'services/nodes/createNodeService/createNodeService.types';

export type MountAddressProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  existingStreets: string[];
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  isDisabledAddress: boolean;
};
