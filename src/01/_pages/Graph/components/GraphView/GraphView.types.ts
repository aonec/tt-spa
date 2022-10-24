import { ArchivesDataModel } from 'myApi';

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
};

export type PreparedArchiveValues = {
  time: string;
  value: number;
};
