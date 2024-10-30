import { FC } from 'react';
import {
  LinkButtonWrapper,
  ResourceStatisticsWrapper,
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

export const TaskQualityDashboardPanel: FC<
  Props<DashboardTaskQualityResponse>
> = ({ data, otherData }) => {
  if (otherData) {
    return (
      <Wrapper>
        <Title>Остальные округа</Title>
        <AverageTime>
          {otherData.reduce(
            (acc, elem) =>
              acc +
              (elem?.averageCompletionTime
                ? Number(elem?.averageCompletionTime)
                : 0),
            0,
          ) / otherData.length}{' '}
          <AverageTimeDescription>задач</AverageTimeDescription>
        </AverageTime>
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
        {data.averageCompletionTime}{' '}
        <AverageTimeDescription>задач</AverageTimeDescription>
      </AverageTime>
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
