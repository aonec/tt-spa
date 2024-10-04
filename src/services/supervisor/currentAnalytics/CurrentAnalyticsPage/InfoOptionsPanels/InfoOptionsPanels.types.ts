import { DashboardCurrentAnalitycsResponse } from 'api/types';
import { DashboardDataType } from '../../currentAnalyticsService.types';

export type Props = {
  dashboardData: DashboardCurrentAnalitycsResponse | null;
  currentDashboardType: DashboardDataType;
  setCurrentDashboardType: (type: DashboardDataType) => void;
};
