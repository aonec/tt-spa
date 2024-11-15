import { DashboardQueryParams } from '../../currentAnalyticsService.types';

export type Props = {
  dashboardFilters: DashboardQueryParams;
  setDashboardFilters: (payload: DashboardQueryParams) => void;
  resetDashboardFilters: () => void;
  isCommon?: boolean;
  selectValue?: EDateRange;
  setValue?: React.Dispatch<React.SetStateAction<EDateRange>>;
};

export enum EDateRange {
  Week = 'Week',
  Month = 'Month',
  Quarter = 'Quarter',
}
