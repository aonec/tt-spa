import { FC, useMemo } from 'react';
import {
  Count,
  Dictrict,
  Percentage,
  Resource,
  StatisticsWrapper,
  TitleWrapper,
  Wrapper,
} from './StatisticItem.styled';
import { Props } from './StatisticItem.types';
import { Chart } from './Chart';
import { prepareChartData } from './StatisticItem.utils';
import { DashboardResourceAnalyticsDetail } from './DashboardAnalyticsDetail/DashboardAnalyticsDetail.resource';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';
import { DashboardMalfunctionAnalyticsDetail } from './DashboardAnalyticsDetail/DashboardAnalyticsDetail.malfunction';

export const StatisticItem: FC<Props> = ({
  data,
  selectValue,
  currentDashboardType,
}) => {
  const { chart, details, title, totalTasksCount, totalTasksPercentage } = data;

  const preparedChart = useMemo(() => {
    return chart ? prepareChartData(chart, selectValue) : [];
  }, [selectValue, chart]);

  const DetailComponent = useMemo(() => {
    const components = {
      [DashboardDataType.AverageCompletionTime]: () => null,
      [DashboardDataType.MalfunctionsCount]:
        DashboardMalfunctionAnalyticsDetail,
      [DashboardDataType.PipeRupturesCount]: DashboardResourceAnalyticsDetail,
      [DashboardDataType.ResourceDisconnectsCount]:
        DashboardResourceAnalyticsDetail,
      [DashboardDataType.TasksCount]: () => null,
    };

    return components[currentDashboardType];
  }, [currentDashboardType]);

  const isPositive = (totalTasksPercentage || 0) > 0;

  return (
    <Wrapper>
      <TitleWrapper>
        <Dictrict>{title}</Dictrict>
        <Count>
          {totalTasksCount}
          {Boolean(totalTasksPercentage) && (
            <Percentage isPositive={isPositive}>
              {isPositive && '+'}
              {totalTasksPercentage}%
            </Percentage>
          )}
        </Count>
      </TitleWrapper>
      <StatisticsWrapper>
        <Chart
          chart={preparedChart}
          type={selectValue}
          currentDashboardType={currentDashboardType}
        />
        <Resource>
          {details?.map((elem) => (
            <DetailComponent
              key={elem.resourceType}
              data={elem}
              title={data.title}
            />
          ))}
        </Resource>
      </StatisticsWrapper>
    </Wrapper>
  );
};
