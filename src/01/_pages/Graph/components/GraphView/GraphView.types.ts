import {
  ArchivesDataModel,
  DateTimeTaskStatisticsItemArrayDictionaryItem,
} from 'myApi';

export type ReportType = 'hourly' | 'daily' | 'monthly';

export type GraphViewProps = {
  graphParam: string;
  data: ArchivesDataModel;
  reportType: ReportType;
  taskStatistics: DateTimeTaskStatisticsItemArrayDictionaryItem[];
  wrapperId: string;
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
