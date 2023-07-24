import { HousingStockResponse, NonResidentialBuildingResponse } from 'api/types';
import { UpdateNodeFormPayloadCallback } from 'services/nodes/createNodeService/createNodeService.types';

export type MountAddressProps = {
  building: HousingStockResponse | NonResidentialBuildingResponse | null;
  existingCities: string[] | null;
  existingStreets: string[];
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  isDisabledAddress: boolean;
};
