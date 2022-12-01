import { CalculatorIntoHousingStockResponse } from 'myApi';

export type ConnectionSettingsProps = {
  goPrevStep: () => void;
  calculatorsList: CalculatorIntoHousingStockResponse[] | null;
};

export enum CalculatorConnectionType {
  Connected = 'Connected',
  NoConnection = 'NoConnection',
}
