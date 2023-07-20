import {
  CalculatorIntoHousingStockResponse,
  EPipeNodeValidationMessageStringDictionaryItem,
  HousingStockResponse,
  NodeServiceZoneResponse,
} from 'api/myApi';
import { CreateNodeFormPayload } from '../../createNodeService.types';

export type CreateNodeConfirmationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  requestPayload: CreateNodeFormPayload;
  housingStock: HousingStockResponse;
  calculator: CalculatorIntoHousingStockResponse | null;
  serviceZone: NodeServiceZoneResponse;
  isLoading: boolean;
  handleSubmitForm: () => void;
  validationResult: EPipeNodeValidationMessageStringDictionaryItem[];
};
