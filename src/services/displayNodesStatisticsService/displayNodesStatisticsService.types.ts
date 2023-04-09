import { ReportType } from '01/_pages/Graph/components/GraphView/GraphView.types';
import moment from 'moment';

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
  From: moment.Moment | null;
  To: moment.Moment | null;
};

export type DateRange = {
  From: string;
  To: string;
};

export type ArchiveReadingsFilter = DateRange & {
  ReportType: ReportType;
};
