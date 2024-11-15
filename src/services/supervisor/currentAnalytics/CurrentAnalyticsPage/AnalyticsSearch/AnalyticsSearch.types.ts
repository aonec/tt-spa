import { DashboardQueryParams } from '../../currentAnalyticsService.types';

export type Props = {
  dashboardFilters: DashboardQueryParams;
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  resetDashboardFilters: () => void;
};
