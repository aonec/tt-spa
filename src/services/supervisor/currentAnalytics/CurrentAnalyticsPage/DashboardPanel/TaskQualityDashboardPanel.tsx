import { FC } from 'react';
import {
  LinkButtonWrapper,
  ResourceStatisticsWrapper,
  TaskQualityAnalyticsTitle,
  TaskQualityAnalyticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { DashboardTaskQualityResponse } from 'api/types';
import {
  AverageTime,
  AverageTimeDescription,
} from './ResourceStatistic/ResourceStatistic.styled';
import { OtherTaskQualityDetailStatistic } from './OtherDetailStatistic/OtherTaskQualityDetailStatistic';
import { TaskQualityDetail } from './ResourceStatistic/TaskQualityDetail';
import { CitySmallGrayIcon, TimerIcon } from 'ui-kit/icons';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { getTaskQualityOtherData } from './utils';

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
        <Title>Остальные округа</Title>
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
          {averageCompletionTime} мин
        </TaskQualityAnalyticsWrapper>

        <SpaceLine noPadding noTop />

        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherTaskQualityDetailStatistic item={item} />
          ))}
        </ResourceStatisticsWrapper>
        <LinkButtonWrapper>
          <LinkButton onClick={() => void 0}>Показать больше</LinkButton>
        </LinkButtonWrapper>
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
        {data.averageCompletionTime} мин
      </TaskQualityAnalyticsWrapper>

      <SpaceLine noPadding noTop />

      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <TaskQualityDetail data={detail} />
        ))}
      </ResourceStatisticsWrapper>
      <LinkButtonWrapper>
        <LinkButton onClick={() => void 0}>Подробнее</LinkButton>
      </LinkButtonWrapper>
    </Wrapper>
  );
};
