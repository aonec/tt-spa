import { ReportRequestHistoryResponse } from 'api/myApi';

export type ReportsListProps = {
  reportsList: ReportRequestHistoryResponse[] | null;
  isLoading: boolean;
  openExistedReport: (payload: Record<string, string>) => void;
};
