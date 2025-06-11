import {
  BuildingShortResponse,
  CalculatorConnectionStatisticsResponsePagedList,
  ECalculatorConnectionGroupType,
  CalculatorConnectionInfoResponse,
  EConnectionStatusType,
} from 'api/types';

export type CalculatorAnalysisType = {
  id: number;
  model: string;
  serialNumber: string;
  isConnected: boolean;
  connectionStatus: EConnectionStatusType;
  address: BuildingShortResponse | null;
  connectionInfo: CalculatorConnectionInfoResponse | null;
};

export type CalculatorsSortedListApi = {
  connectionGroupType: ECalculatorConnectionGroupType;
  calculatorConnectionStatisticsList: CalculatorConnectionStatisticsResponsePagedList;
}[];

export type DownloadParams = {
  name: string;
  filterConnectionGroupType: ECalculatorConnectionGroupType;
};

export type PageNumberStoreType = {
  [key in ECalculatorConnectionGroupType]: number;
};
