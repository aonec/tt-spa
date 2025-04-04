import { OrganizationResponsePagedList } from 'api/types';
import { DashboardQueryParams } from '../../currentAnalyticsService.types';

export type Props = {
  dashboardFilters: DashboardQueryParams;
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  resetDashboardFilters: () => void;
  isCommon?: boolean;
  selectValue?: EDateRange;
  setValue?: (payload: EDateRange) => void;
  organizationsList: OrganizationResponsePagedList | null;
};

export enum EDateRange {
  Week = 'Week',
  Month = 'Month',
  Quarter = 'Quarter',
}
