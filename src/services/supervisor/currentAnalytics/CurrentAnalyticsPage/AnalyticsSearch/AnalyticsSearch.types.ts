import { HouseManagementWithStreetsResponse } from 'api/types';
import { DashboardQueryParams } from '../../currentAnalyticsService.types';

export type Props = {
  managementFirms: HouseManagementWithStreetsResponse[] | null;
  dashboardFilters: DashboardQueryParams;
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  resetDashboardFilters: () => void;
};
