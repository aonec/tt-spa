import {
  CalculatorIntoHousingStockResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'api/types';

export type AddCalculatorConnectionProps = {
  node: PipeNodeResponse | null;
  calculators: CalculatorIntoHousingStockResponse[];
  handleUpdateNodeConnection: (payload: UpdatePipeNodeRequest) => void;
  handleOpenCreateCalculatorModal: () => void;
  isLoading: boolean;
  openRemoveConnectionModal: () => void;
};
