import {
  DashboardSummaryResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';
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
  isLoadingSummary: boolean;
  analyticsData:
    | DashboardTaskResourceResponse[]
    | DashboardTaskMalfunctionResponse[]
    | null;
  organizations: OrganizationResponsePagedList | null;
  dateRangeType: EDateRange;
  setDateRangeType: (payload: EDateRange) => void;
};
