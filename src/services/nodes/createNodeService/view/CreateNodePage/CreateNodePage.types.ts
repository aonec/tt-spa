import { CreatePipeNodeRequest, HousingStockResponse } from 'myApi';

export type CreateNodePageProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  isLoadingHousingStock: boolean;
  existingStreets: string[];
  stepNumber: number;
  updateRequestPayload: (payload: CreatePipeNodeRequest) => void;
  goPrevStep: () => void;
};
