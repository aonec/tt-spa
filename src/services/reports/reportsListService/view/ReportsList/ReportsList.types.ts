import { ReportRequestHistoryResponse } from 'api/types';

export type ReportsListProps = {
  reportsList: ReportRequestHistoryResponse[] | null;
  isLoading: boolean;
  openExistedReport: (payload: Record<string, string>) => void;
  setRunnerModalOpen: (payload: boolean) => void;
};
