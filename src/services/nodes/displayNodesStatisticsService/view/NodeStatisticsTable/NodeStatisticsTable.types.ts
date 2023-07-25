import { ArchivesDataGroup } from 'api/types';
import { ReportType } from '../StatisticsGraph/StatisticsGraph.types';

export type NodeStatisticsTableProps = {
  graphType: string;
  archiveData: ArchivesDataGroup[];
  reportType: ReportType;
};
