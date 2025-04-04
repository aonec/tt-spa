import { VictoryLabelProps } from 'victory';
import { ChartType } from '../../StatisticItem.types';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export type Props = VictoryLabelProps & {
  datum?: ChartType;
  currentDashboardType?: DashboardDataType;
};
