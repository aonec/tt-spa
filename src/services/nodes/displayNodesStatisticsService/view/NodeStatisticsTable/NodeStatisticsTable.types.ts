import { ReportType } from '01/_pages/Graph/components/GraphView/GraphView.types';
import { ArchivesDataGroup } from 'myApi';

export type NodeStatisticsTableProps = {
  graphType: string;
  archiveData: ArchivesDataGroup[];
  reportType: ReportType;
};
