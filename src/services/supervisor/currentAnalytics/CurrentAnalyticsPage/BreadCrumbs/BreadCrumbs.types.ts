import { DashboardSummaryResponse } from 'api/types';
import { DashboardQueryParams } from '../../currentAnalyticsService.types';

export type Props = {
  dashboardSummary: DashboardSummaryResponse | null;
  setDashboardFilters: (payload: DashboardQueryParams) => void;
};
