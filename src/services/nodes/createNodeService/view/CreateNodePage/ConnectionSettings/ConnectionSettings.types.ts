import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
} from 'myApi';

export type ConnectionSettingsProps = {
  goPrevStep: () => void;
  calculatorsList: CalculatorIntoHousingStockResponse[] | null;
  openCreateCalculatorModal: () => void;
  updateRequestPayload: (payload: CreatePipeNodeRequest) => void;
  requestPayload: CreatePipeNodeRequest
};

export enum CalculatorConnectionType {
  Connected = 'Connected',
  NoConnection = 'NoConnection',
}
