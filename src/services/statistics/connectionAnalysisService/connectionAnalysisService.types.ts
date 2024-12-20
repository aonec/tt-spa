import { EConnectionStatusType } from 'api/types';

export type CalculatorAnalysisType = {
  id: number;
  model: string;
  serialNumber: string;
  isConnected: boolean;
  connectionStatus: EConnectionStatusType;
};
export type CalculatorsSortedList = {
  Success: CalculatorAnalysisType[];
  NotPolled: CalculatorAnalysisType[];
  WithError: CalculatorAnalysisType[];
  NoArchive: CalculatorAnalysisType[];
};

export enum ConnectionStatuses {
  Success = 'Success',
  NotPolled = 'NotPolled',
  WithError = 'WithError',
  NoArchive = 'NoArchive',
}
