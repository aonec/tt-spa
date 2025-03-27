import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';
import { ChartType } from '../StatisticItem.types';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export type Props = {
  chart: ChartType[] | null;
  type?: EDateRange;
  currentDashboardType?: DashboardDataType;
};
