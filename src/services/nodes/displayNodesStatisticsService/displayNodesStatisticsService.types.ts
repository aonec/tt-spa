import dayjs from 'api/dayjs';
import { ReportType } from './view/StatisticsGraph/StatisticsGraph.types';

export type DisplayNodesStatisticsContainerProps = {
  nodeId: number;
  pipeCount: number;
};

export type FetchArchiveReadingsPayload = ArchiveReadingsFilter & {
  nodeId: number;
  pipeCount: number;
};

export type TasksStatisticPayload = DateRange & {
  nodeId: number;
};

export type FormikDateRange = {
  From: dayjs.Dayjs | null;
  To: dayjs.Dayjs | null;
};

export type DateRange = {
  From: string;
  To: string;
};

export type ArchiveReadingsFilter = DateRange & {
  ReportType: ReportType;
};
