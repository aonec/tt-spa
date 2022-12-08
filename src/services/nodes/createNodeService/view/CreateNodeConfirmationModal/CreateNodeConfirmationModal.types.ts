import {
  CalculatorIntoHousingStockResponse,
  HousingStockResponse,
  NodeServiceZoneResponse,
} from 'myApi';
import { CreateNodeFormPayload } from '../../createNodeService.types';

export type CreateNodeConfirmationModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  requestPayload: CreateNodeFormPayload;
  housingStock: HousingStockResponse;
  calculator: CalculatorIntoHousingStockResponse | null;
  serviceZone: NodeServiceZoneResponse 
};
