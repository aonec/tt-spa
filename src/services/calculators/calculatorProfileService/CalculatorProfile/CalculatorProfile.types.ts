import {
  CalculatorResponse,
  NodeOnHousingStockResponse,
  PipeNodeIntoCalculatorResponse,
} from 'api/myApi';
import { CalculatorProfileGrouptype } from '../calculatorProfileService.constants';

export type CalculatorProfileProps = {
  calculator: CalculatorResponse;
  currentGrouptype: CalculatorProfileGrouptype;
  setGrouptype: (grouptype: CalculatorProfileGrouptype) => void;
  handleOpenCloseCalculatorModal: (payload: CalculatorResponse) => void;
  handleOpenCheckCalculatorModal: (payload: CalculatorResponse) => void;
  handleOpenConsumptionReportModal: () => void;
  openDevicesListModal: (
    payload: NodeOnHousingStockResponse | PipeNodeIntoCalculatorResponse,
  ) => void;
  isPermitionToCalculatorActions: boolean;
};
