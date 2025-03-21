import {
  DashboardMalfunctionChartItemModel,
  DashboardResourceChartItemModel,
} from 'api/types';

export type Props = {
  detail: DashboardResourceChartItemModel | DashboardMalfunctionChartItemModel;
};
