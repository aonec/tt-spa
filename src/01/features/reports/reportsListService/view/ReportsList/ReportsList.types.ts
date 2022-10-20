import { ReportRequestHistoryResponse } from 'myApi';

export type ReportsListProps = {
  reportsList: ReportRequestHistoryResponse[] | null;
  isLoading: boolean;
};
