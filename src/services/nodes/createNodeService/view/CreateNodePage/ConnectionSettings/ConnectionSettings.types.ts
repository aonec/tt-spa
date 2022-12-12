import { CalculatorIntoHousingStockResponse } from 'myApi';
import { CreateNodeFormPayload, UpdateNodeFormPayloadCallback } from 'services/nodes/createNodeService/createNodeService.types';

export type ConnectionSettingsProps = {
  goPrevStep: () => void;
  calculatorsList: CalculatorIntoHousingStockResponse[] | null;
  openCreateCalculatorModal: () => void;
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  requestPayload: CreateNodeFormPayload;
};

export enum CalculatorConnectionType {
  Connected = 'Connected',
  NoConnection = 'NoConnection',
}
