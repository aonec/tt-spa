import { CreatePipeNodeRequest, HousingStockResponse } from 'myApi';

export type MountAddressProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  existingStreets: string[];
  updateRequestPayload: (payload: CreatePipeNodeRequest) => void;
  isDisabledAddress: boolean;
};
