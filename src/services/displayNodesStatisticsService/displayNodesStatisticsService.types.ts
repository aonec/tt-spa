import { ReportType } from '01/_pages/Graph/components/GraphView/GraphView.types';

export type DisplayNodesStatisticsContainerProps = {
  nodeId: number;
  pipeCount: number;
};

export type FetchArchiveReadingsPayload = ArchiveReadingsFilter & {
  nodeId: number;
  pipeCount: number;
};

export type DateRange = {
  From: string;
  To: string;
};

export type ArchiveReadingsFilter = DateRange & {
  ReportType: ReportType;
};
