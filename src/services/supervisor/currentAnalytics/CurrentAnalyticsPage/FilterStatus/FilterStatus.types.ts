import {
  DashboardDataType,
  DashboardQueryParams,
} from '../../currentAnalyticsService.types';

export type Props = {
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  dashboardFilters: DashboardQueryParams;
  currentDashboardType: DashboardDataType;
};
