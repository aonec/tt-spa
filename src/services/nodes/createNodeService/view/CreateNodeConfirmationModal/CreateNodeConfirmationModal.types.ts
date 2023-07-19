import {
  CalculatorIntoHousingStockResponse,
  EPipeNodeValidationMessageStringDictionaryItem,
  HousingStockResponse,
  NodeServiceZoneResponse,
  NonResidentialBuildingResponse,
} from 'myApi';
import { CreateNodeFormPayload } from '../../createNodeService.types';

export type CreateNodeConfirmationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  requestPayload: CreateNodeFormPayload;
  building: HousingStockResponse | NonResidentialBuildingResponse;
  calculator: CalculatorIntoHousingStockResponse | null;
  serviceZone: NodeServiceZoneResponse;
  isLoading: boolean;
  handleSubmitForm: () => void;
  validationResult: EPipeNodeValidationMessageStringDictionaryItem[];
};
