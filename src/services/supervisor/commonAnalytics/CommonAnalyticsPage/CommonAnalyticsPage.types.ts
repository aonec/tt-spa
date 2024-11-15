import {
  DashboardSummaryResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';
import {
  DashboardDataType,
  DashboardQueryParams,
} from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export type Props = {
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  dashboardFilters: DashboardQueryParams;
  resetDashboardFilters: () => void;
  dashboardSummary: DashboardSummaryResponse | null;
  currentDashboardType: DashboardDataType;
  setCurrentDashboardType: (payload: DashboardDataType) => void;
  isLoading: boolean;
  analyticsData:
    | DashboardTaskResourceResponse[]
    | DashboardTaskMalfunctionResponse[]
    | null;
};
