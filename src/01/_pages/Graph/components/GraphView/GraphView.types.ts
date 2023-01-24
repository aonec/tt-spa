import {
  ArchivesDataModel,
  DateTimeTaskStatisticsItemArrayDictionaryItem,
} from 'myApi';

export type ResourceType =
  | 'Heat'
  | 'ColdWaterSupply'
  | 'HotWaterSupply'
  | 'Electricity';

export type ReportType = 'hourly' | 'daily' | 'monthly';

export type GraphViewProps = {
  graphParam: string;
  data: ArchivesDataModel;
  reportType: ReportType;
  taskStatistics: DateTimeTaskStatisticsItemArrayDictionaryItem[];
};

export type PreparedArchiveValues = {
  time: string;
  value: number;
};

export type GetTaskXPosPayload = {
  minData: string;
  currentData?: string;
  reportType: ReportType;
};
