import {
  CalculatorIntoHousingStockResponse,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
  NonResidentialBuildingResponse,
} from 'api/types';
import {
  CreateNodeFormPayload,
  UpdateNodeFormPayloadCallback,
} from '../../createNodeService.types';
import { Event } from 'effector';

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
  handleDeleteServiceZone: (payload: NodeServiceZoneResponse | null) => void;
  isDialogOpen: boolean;
  deletingServiceZone: NodeServiceZoneResponse | null;
  handleFinallyDeleteServiceZone: (payload: number) => void;
  successDeleteServiceZone: Event<void>;
};
