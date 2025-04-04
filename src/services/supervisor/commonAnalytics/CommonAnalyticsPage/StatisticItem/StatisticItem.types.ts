import {
  DashboardMalfunctionChartItemModel,
  DashboardResourceChartItemModel,
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export type Props = {
  data: DashboardTaskResourceResponse & DashboardTaskMalfunctionResponse;
  selectValue: EDateRange;
  currentDashboardType: DashboardDataType;
};

export type ChartType = {
  x: string;
  y: number;
  label: number;
  details?:
    | DashboardResourceChartItemModel[]
    | DashboardMalfunctionChartItemModel[]
    | null;
};
