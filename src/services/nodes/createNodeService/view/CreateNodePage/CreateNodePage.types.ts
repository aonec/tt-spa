import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  HousingStockResponse,
  NodeServiceZoneListResponse,
} from 'myApi';

export type CreateNodePageProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  isLoadingHousingStock: boolean;
  existingStreets: string[];
  stepNumber: number;
  updateRequestPayload: (payload: CreatePipeNodeRequest) => void;
  goPrevStep: () => void;
  calculatorsList: CalculatorIntoHousingStockResponse[] | null;
  openCreateCalculatorModal: () => void;
  isDisabledAddress: boolean;
  requestPayload: CreatePipeNodeRequest;
  nodeServiceZones: NodeServiceZoneListResponse | null;
  openCreateNodeServiceZoneModal: () => void;
};
