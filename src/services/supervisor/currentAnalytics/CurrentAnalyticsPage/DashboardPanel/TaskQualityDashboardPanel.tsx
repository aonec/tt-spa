import { FC } from 'react';
import {
  ResourceStatisticsWrapper,
  TaskQualityAnalyticsTitle,
  TaskQualityAnalyticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { DashboardTaskQualityResponse } from 'api/types';
import {
  AverageTime,
  AverageTimeDescription,
} from './ResourceStatistic/ResourceStatistic.styled';
import { OtherTaskQualityDetailStatistic } from './OtherDetailStatistic/OtherTaskQualityDetailStatistic';
import { TaskQualityDetail } from './ResourceStatistic/TaskQualityDetail';
import { CitySmallGrayIcon, TimerIcon } from 'ui-kit/icons';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { formatCompletionTime, getTaskQualityOtherData } from './utils';
import { DetailButton } from './DetailButton';

export const TaskQualityDashboardPanel: FC<
  Props<DashboardTaskQualityResponse>
> = ({ data, otherData }) => {
  if (otherData) {
    const {
      allTasksCount,
      totalBuildingCount,
      buildingsWithTasksCount,
      averageCompletionTime,
    } = getTaskQualityOtherData(otherData);

    return (
      <Wrapper>
        <Title>Прочие</Title>
        <AverageTime>
          {allTasksCount} <AverageTimeDescription>задач</AverageTimeDescription>
        </AverageTime>

        <TaskQualityAnalyticsWrapper>
          <TaskQualityAnalyticsTitle>
            <CitySmallGrayIcon /> Объекты
          </TaskQualityAnalyticsTitle>
          {buildingsWithTasksCount} / {totalBuildingCount}
        </TaskQualityAnalyticsWrapper>

        <TaskQualityAnalyticsWrapper>
          <TaskQualityAnalyticsTitle>
            <TimerIcon /> Среднее время на закрытие
          </TaskQualityAnalyticsTitle>
          {formatCompletionTime(averageCompletionTime)} мин
        </TaskQualityAnalyticsWrapper>

        <SpaceLine noPadding noTop />

        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherTaskQualityDetailStatistic key={item.title} item={item} />
          ))}
        </ResourceStatisticsWrapper>
      </Wrapper>
    );
  }

  if (!data) return null;

  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <AverageTime>
        {data.totalTasksCount}{' '}
        <AverageTimeDescription>задач</AverageTimeDescription>
      </AverageTime>
      <TaskQualityAnalyticsWrapper>
        <TaskQualityAnalyticsTitle>
          <CitySmallGrayIcon /> Объекты
        </TaskQualityAnalyticsTitle>
        {data.buildingsWithTasksCount} / {data.totalBuildingCount}
      </TaskQualityAnalyticsWrapper>
      <TaskQualityAnalyticsWrapper>
        <TaskQualityAnalyticsTitle>
          <TimerIcon /> Среднее время на закрытие
        </TaskQualityAnalyticsTitle>
        {formatCompletionTime(data.averageCompletionTime)} мин
      </TaskQualityAnalyticsWrapper>
      <SpaceLine noPadding noTop />
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <TaskQualityDetail
            key={detail.deviationType}
            data={detail}
            title={data.title}
          />
        ))}
      </ResourceStatisticsWrapper>
      <DetailButton value={data.title} />
    </Wrapper>
  );
};
