import {
  ArchivesDataGroupValue,
  ArchivesDataModel,
  DateTimeTaskStatisticsItemArrayDictionaryItem,
} from 'api/myApi';

export type ReportType = 'hourly' | 'daily' | 'monthly';

export type GraphViewProps = {
  graphParam: string;
  data: ArchivesDataModel;
  reportType: ReportType;
  taskStatistics: DateTimeTaskStatisticsItemArrayDictionaryItem[];
  wrapperId: string;
  withFault: boolean;
};

export type PreparedArchiveValues = {
  value: number;
  timeUtc: string;
} & ArchivesDataGroupValue;

export type GetTaskXPosPayload = {
  minDate: string;
  maxDate: string;
  currentData?: string;
  reportType: ReportType;
};
