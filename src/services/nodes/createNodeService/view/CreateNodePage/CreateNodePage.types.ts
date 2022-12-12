import {
  CalculatorIntoHousingStockResponse,
  HousingStockResponse,
  NodeServiceZoneListResponse,
} from 'myApi';
import {
  CreateNodeFormPayload,
  UpdateNodeFormPayloadCallback,
} from '../../createNodeService.types';

export type CreateNodePageProps = {
  housingStock: HousingStockResponse | null;
  existingCities: string[] | null;
  isLoadingHousingStock: boolean;
  existingStreets: string[];
  stepNumber: number;
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  goPrevStep: () => void;
  calculatorsList: CalculatorIntoHousingStockResponse[] | null;
  openCreateCalculatorModal: () => void;
  isDisabledAddress: boolean;
  requestPayload: CreateNodeFormPayload;
  nodeServiceZones: NodeServiceZoneListResponse | null;
  openCreateNodeServiceZoneModal: () => void;
  openConfiramtionModal: () => void;
};
