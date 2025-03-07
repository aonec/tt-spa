import {
  BuildingShortResponse,
  CalculatorConnectionStatisticsResponsePagedList,
  EConnectionStatusType,
} from 'api/types';

export type CalculatorAnalysisType = {
  id: number;
  model: string;
  serialNumber: string;
  isConnected: boolean;
  connectionStatus: EConnectionStatusType;
  address: BuildingShortResponse | null;
};

export enum ConnectionStatuses {
  Success = 'Success',
  NotPolling = 'NotPolling',
  Error = 'Error',
  NoArchives = 'NoArchives',
}

export type CalculatorsSortedListApi = {
  connectionGroupType: ConnectionStatuses;
  calculatorConnectionStatisticsList: CalculatorConnectionStatisticsResponsePagedList;
}[];
