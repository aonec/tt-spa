import {
  DashboardSummaryResponse,
  DashboardTaskAverageTimeResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskQualityResponse,
  DashboardTaskResourceResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import {
  DashboardDataType,
  DashboardQueryParams,
} from '../currentAnalyticsService.types';

export type Props = {
  isLoadingSummary: boolean;
  dashboardSummary: DashboardSummaryResponse | null;
  currentDashboardType: DashboardDataType;
  setCurrentDashboardType: (payload: DashboardDataType) => void;
  dashboardPiperuptersList: DashboardTaskResourceResponse[] | null;
  dashboardResourceDisconnection: DashboardTaskResourceResponse[] | null;
  dashboardMalfunctions: DashboardTaskMalfunctionResponse[] | null;
  dashboardAverageTime: DashboardTaskAverageTimeResponse[] | null;
  dashboardServiceQuality: DashboardTaskQualityResponse[] | null;
  isLoadingPanels: boolean;
  dashboardFilters: DashboardQueryParams;
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  resetDashboardFilters: () => void;
  organizationsList: OrganizationResponsePagedList | null;
};
