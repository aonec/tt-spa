import {
  DashboardMalfunctionDetailChartItemModel,
  DashboardResourceDetailChartItemModel,
} from 'api/types';
import dayjs from 'dayjs';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';
import { ChartType } from './StatisticItem.types';

export function prepareChartData(
  data: DashboardResourceDetailChartItemModel[] &
    DashboardMalfunctionDetailChartItemModel[],
  selectValue: EDateRange,
): ChartType[] {
  if (selectValue === EDateRange.Week) {
    return data?.map((chart) => ({
      x: dayjs(chart.date)
        .format('DD MMMM')
        .replace(/(\d+)\s([а-яА-Я]{3})[а-яА-Я]*/u, '$1 $2'),

      y: chart.value || 0,
      label: chart.value || 0,
      details: chart.details,
    }));
  }

  if (selectValue === EDateRange.Month) {
    return data?.map((chart) => {
      return {
        x: dayjs(chart.date)
          .format('DD MMMM')
          .replace(/(\d+)\s([а-яА-Я]{3})[а-яА-Я]*/u, '$1 $2'),

        y: chart.value || 0,
        label: chart.value || 0,
        details: chart.details,
      };
    });
  } else if (selectValue === EDateRange.Quarter) {
    // Группировка по месяцам
    const monthlyData: {
      [key: string]: DashboardResourceDetailChartItemModel[] &
        DashboardMalfunctionDetailChartItemModel[];
    } = {};

    data.forEach((item) => {
      if (item.date) {
        const monthKey = dayjs(item.date).format('MMMM'); // месяцы начинаются с 0, поэтому прибавляем 1

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = [];
        }
        monthlyData[monthKey].push(item);
      }
    });

    // Преобразуем сгруппированные данные по месяцам
    return Object.entries(monthlyData).map(([monthKey, items]) => {
      const totalValue = items.reduce(
        (sum, item) => sum + (item.value || 0),
        0,
      );

      return { x: monthKey, y: totalValue, label: totalValue };
    });
  }

  return data?.map((chart) => ({
    x: dayjs(chart.date).format('DD'),
    y: chart.value || 0,
    label: chart.value || 0,
    details: chart.details,
  }));
}
