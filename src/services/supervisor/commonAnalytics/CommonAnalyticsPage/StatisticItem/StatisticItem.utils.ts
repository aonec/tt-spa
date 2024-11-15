import { DashboardChartModel } from 'api/types';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';
import { ChartType } from './StatisticItem.types';

export function prepareChartData(
  data: DashboardChartModel[],
  selectValue: EDateRange,
): ChartType[] {
  if (selectValue === EDateRange.Week) {
    if (Number(data?.length) > 9) {
      return data?.map((chart) => ({
        x: dayjs(chart.date).format('DD'),
        y: chart.value || 0,
      }));
    } else {
      return data?.map((chart) => ({
        x: dayjs(chart.date)
          .format('DD MMMM')
          .replace(/(\d+)\s([а-яА-Я]{3})[а-яА-Я]*/u, '$1 $2'),

        y: chart.value || 0,
      }));
    }
  }

  if (selectValue === EDateRange.Month) {
    // Группировка по неделям
    const weeklyData: { [key: string]: DashboardChartModel[] } = {};

    data.forEach((item) => {
      if (item.date) {
  
        const weekNumber = dayjs(item.date).format('ww');
        const weekKey = `${weekNumber} неделя`;

        if (!weeklyData[weekKey]) {
          weeklyData[weekKey] = [];
        }
        weeklyData[weekKey].push(item);
      }
    });

    // Преобразуем сгруппированные данные по неделям
    return Object.entries(weeklyData).map(([weekKey, items]) => {
      const totalValue = items.reduce(
        (sum, item) => sum + (item.value || 0),
        0,
      );

      return { x: weekKey, y: totalValue };
    });
  } else if (selectValue === EDateRange.Quarter) {
    // Группировка по месяцам
    const monthlyData: { [key: string]: DashboardChartModel[] } = {};

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

      return { x: monthKey, y: totalValue };
    });
  }

  return data?.map((chart) => ({
    x: dayjs(chart.date).format('DD'),
    y: chart.value || 0,
  }));
}
