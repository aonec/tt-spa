import {
  DashboardSummaryResponse,
  DashboardTaskAverageTimeResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskQualityResponse,
  DashboardTaskResourceResponse,
  HouseManagementWithStreetsResponse,
} from 'api/types';
import {
  DashboardDataType,
  DashboardQueryParams,
} from '../currentAnalyticsService.types';

export type Props = {
  isLoading: boolean;
  dashboardSummary: DashboardSummaryResponse | null;
  currentDashboardType: DashboardDataType;
  managementFirms: HouseManagementWithStreetsResponse[] | null;
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
};
