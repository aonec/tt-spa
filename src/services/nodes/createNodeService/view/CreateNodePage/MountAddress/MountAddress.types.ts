import { HousingStockResponse } from 'api/myApi';
import { UpdateNodeFormPayloadCallback } from 'services/nodes/createNodeService/createNodeService.types';

export type MountAddressProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  existingStreets: string[];
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  isDisabledAddress: boolean;
};
