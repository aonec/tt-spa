import { ArchivesDataGroup } from 'api/myApi';
import { ReportType } from '../StatisticsGraph/StatisticsGraph.types';

export type NodeStatisticsTableProps = {
  graphType: string;
  archiveData: ArchivesDataGroup[];
  reportType: ReportType;
};
