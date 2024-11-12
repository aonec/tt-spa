import {
  DashboardSummaryResponse,
  DashboardTaskAverageTimeResponse,
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';
import { DashboardDataType } from '../currentAnalyticsService.types';

export type Props = {
  isLoading: boolean;
  dashboardSummary: DashboardSummaryResponse | null;
  currentDashboardType: DashboardDataType;
  setCurrentDashboardType: (payload: DashboardDataType) => void;
  dashboardPiperuptersList: DashboardTaskResourceResponse[] | null;
  dashboardResourceDisconnection: DashboardTaskResourceResponse[] | null;
  dashboardMalfunctions: DashboardTaskMalfunctionResponse[] | null;
  dashboardAverageTime: DashboardTaskAverageTimeResponse[] | null;
  isLoadingPanels: boolean;
};
