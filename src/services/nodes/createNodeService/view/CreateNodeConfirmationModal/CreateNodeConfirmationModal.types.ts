import {
  BuildingListResponse,
  CalculatorIntoHousingStockResponse,
  EPipeNodeValidationMessageStringDictionaryItem,
  HousingStockResponse,
  NodeServiceZoneResponse,
  NonResidentialBuildingResponse,
} from 'api/types';
import { CreateNodeFormPayload } from '../../createNodeService.types';

export type CreateNodeConfirmationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  requestPayload: CreateNodeFormPayload;
  building:
    | BuildingListResponse
    | HousingStockResponse
    | NonResidentialBuildingResponse
    | null;
  calculator: CalculatorIntoHousingStockResponse | null;
  serviceZone: NodeServiceZoneResponse | null;
  isLoading: boolean;
  handleSubmitForm: () => void;
  validationResult: EPipeNodeValidationMessageStringDictionaryItem[];
};
