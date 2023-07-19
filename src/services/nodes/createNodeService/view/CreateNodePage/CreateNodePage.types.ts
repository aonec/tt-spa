import {
  CalculatorIntoHousingStockResponse,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  NonResidentialBuildingResponse,
} from 'myApi';
import {
  CreateNodeFormPayload,
  UpdateNodeFormPayloadCallback,
} from '../../createNodeService.types';

export type CreateNodePageProps = {
  building: HousingStockResponse | NonResidentialBuildingResponse | null;
  existingCities: string[] | null;
  isBuildingLoading: boolean;
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
  validateNode: () => void;
  isValidationLoading: boolean;
};
