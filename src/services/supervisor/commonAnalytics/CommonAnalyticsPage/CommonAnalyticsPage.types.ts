import {
  DashboardSummaryResponse,
  DashboardTaskResourceResponse,
  HouseManagementWithStreetsResponse,
} from 'api/types';
import {
  DashboardDataType,
  DashboardQueryParams,
} from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export type Props = {
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  dashboardFilters: DashboardQueryParams;
  managementFirms: HouseManagementWithStreetsResponse[] | null;
  resetDashboardFilters: () => void;
  dashboardSummary: DashboardSummaryResponse | null;
  currentDashboardType: DashboardDataType;
  setCurrentDashboardType: (payload: DashboardDataType) => void;
  isLoading: boolean;
  analyticsData: DashboardTaskResourceResponse[] | null;
};
