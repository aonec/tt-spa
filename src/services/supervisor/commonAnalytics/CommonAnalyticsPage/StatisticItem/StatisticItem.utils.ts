import {
  DashboardMalfunctionChartItemModel,
  DashboardMalfunctionDetailChartItemModel,
  DashboardResourceChartItemModel,
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
      // Группируем details по resourceType и malfunctionType
      const groupedDetails = items
        .flatMap((item) => item.details || [])
        .reduce((acc, detail) => {
          const key = `${detail.resourceType || ''}-${
            'malfunctionType' in detail ? detail.malfunctionType || '' : ''
          }`;
          if (!acc[key]) {
            acc[key] = { ...detail };
          } else {
            acc[key].totalTasksCount =
              (acc[key].totalTasksCount || 0) + (detail.totalTasksCount || 0);
            acc[key].expiredTasksCount =
              (acc[key].expiredTasksCount || 0) +
              (detail.expiredTasksCount || 0);
          }
          return acc;
        }, {} as Record<string, DashboardMalfunctionChartItemModel | DashboardResourceChartItemModel>);

      return {
        x: monthKey,
        y: totalValue,
        label: totalValue,
        details: Object.values(groupedDetails),
      };
    });
  }

  console.log('tyt');

  return data?.map((chart) => ({
    x: dayjs(chart.date).format('DD'),
    y: chart.value || 0,
    label: chart.value || 0,
    details: chart.details,
  }));
}
