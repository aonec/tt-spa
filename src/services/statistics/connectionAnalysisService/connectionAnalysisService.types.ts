import {
  BuildingShortResponse,
  CalculatorConnectionStatisticsResponsePagedList,
  ECalculatorConnectionGroupType,
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

export type CalculatorsSortedListApi = {
  connectionGroupType: ECalculatorConnectionGroupType;
  calculatorConnectionStatisticsList: CalculatorConnectionStatisticsResponsePagedList;
}[];

export type DownloadParams = {
  name: string;
  filterConnectionGroupType: ECalculatorConnectionGroupType;
};
