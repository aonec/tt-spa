import { DashboardSummaryResponse } from 'api/types';
import { DashboardDataType } from '../../currentAnalyticsService.types';

export type Props = {
  dashboardSummary: DashboardSummaryResponse | null;
  currentDashboardType: DashboardDataType;
  setCurrentDashboardType: (type: DashboardDataType) => void;
  isLoading: boolean;
};
