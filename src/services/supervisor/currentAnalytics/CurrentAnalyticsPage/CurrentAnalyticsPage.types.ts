import { DashboardCurrentAnalitycsResponse } from 'api/types';

export type Props = {
  isLoading: boolean;
  dashboardData: DashboardCurrentAnalitycsResponse[] | null;
};
