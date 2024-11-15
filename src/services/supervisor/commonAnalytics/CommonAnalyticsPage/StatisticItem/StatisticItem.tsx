import { FC, useMemo } from 'react';
import {
  Count,
  Dictrict,
  More,
  Percentage,
  Resource,
  StatisticsWrapper,
  TitleWrapper,
  Wrapper,
} from './StatisticItem.styled';
import { Props } from './StatisticItem.types';
import { Chart } from './Chart';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';
import { prepareChartData } from './StatisticItem.utils';

export const StatisticItem: FC<Props> = ({ data, selectValue }) => {
  const {
    chart,
    details,
    expiredTasksCount,
    title,
    totalTasksCount,
    totalTasksPercentage,
  } = data;

  const preparedChart = useMemo(() => {
    return chart && prepareChartData(chart, selectValue);
  }, [selectValue, chart]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Dictrict>{title}</Dictrict>
        <Count>
          {totalTasksCount}
          <Percentage>{totalTasksPercentage}%</Percentage>
        </Count>
      </TitleWrapper>
      <StatisticsWrapper>
        <Chart chart={preparedChart} />
        <Resource></Resource>
      </StatisticsWrapper>

      <More>Подробнее</More>
    </Wrapper>
  );
};
