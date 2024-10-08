import {
  ArchivesDataGroupValue,
  ArchivesDataModel,
  TaskStatisticsItem,
} from 'api/types';

export type ReportType = 'hourly' | 'daily' | 'monthly';

export type GraphViewProps = {
  graphParam: string;
  data: ArchivesDataModel;
  reportType: ReportType;
  taskStatistics: TaskStatisticsItem[];
  wrapperId: string;
  withFault: boolean;
};

export type PreparedArchiveValues = {
  value: number;
  time: string;
} & ArchivesDataGroupValue;

export type GetTaskXPosPayload = {
  minDate: string;
  maxDate: string;
  currentData?: string;
  reportType: ReportType;
};
