import { ReportRequestHistoryResponse } from 'myApi';

export type ReportsListProps = {
  reportsList: ReportRequestHistoryResponse[] | null;
  isLoading: boolean;
  openExistedReport: (payload: Record<string, string>) => void;
};
