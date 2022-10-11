import {
  ReadingsInterface,
  ReportType,
} from '01/_pages/Graph/components/GraphView/GraphView.types';
import { EResourceType } from 'myApi';

export type DisplayNodesStatisticsContainerProps = {
  nodeId: number;
  resource: EResourceType;
  pipeCount: number;
};

export type FetchArchiveReadingsPayload = ArchiveReadingsFilter & {
  nodeId: number;
};

export type DateRange = {
  from: string;
  to: string;
};

export type ArchiveReadingsFilter = DateRange & {
  reportType: ReportType;
};
