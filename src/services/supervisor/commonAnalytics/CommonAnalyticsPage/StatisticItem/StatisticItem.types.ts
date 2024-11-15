import { DashboardTaskResourceResponse } from 'api/types';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';

export type Props = {
  data: DashboardTaskResourceResponse;
  selectValue: EDateRange;
};

export type ChartType = {
  x: string;
  y: number;
}