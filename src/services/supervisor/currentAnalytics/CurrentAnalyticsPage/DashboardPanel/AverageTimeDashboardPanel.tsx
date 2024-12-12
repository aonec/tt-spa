import { FC } from 'react';
import {
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { TaskAverageTimeDetail } from './ResourceStatistic';
import { DashboardTaskAverageTimeResponse } from 'api/types';
import {
  AverageTime,
  AverageTimeDescription,
} from './ResourceStatistic/ResourceStatistic.styled';
import { OtherAverageTimeDetailStatistic } from './OtherDetailStatistic/OtherAverageTimeDetailStatistic';
import { DetailButton } from './DetailButton';
import { formatCompletionTime } from './utils';

export const AverageTimeDashboardPanel: FC<
  Props<DashboardTaskAverageTimeResponse>
> = ({ data, otherData }) => {
  if (otherData?.length) {
    return (
      <Wrapper>
        <Title>Прочие</Title>
        <AverageTime>
          {formatCompletionTime(
            otherData.reduce(
              (acc, elem) =>
                acc +
                (elem?.averageCompletionTime
                  ? Number(elem?.averageCompletionTime)
                  : 0),
              0,
            ) / otherData.length,
          )}{' '}
          <AverageTimeDescription>мин</AverageTimeDescription>
        </AverageTime>
        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherAverageTimeDetailStatistic item={item} key={item.title} />
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
        {formatCompletionTime(data.averageCompletionTime || 0)}{' '}
        <AverageTimeDescription>мин</AverageTimeDescription>
      </AverageTime>
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <TaskAverageTimeDetail
            data={detail}
            title={data.title}
            key={detail.malfunctionType}
          />
        ))}
      </ResourceStatisticsWrapper>
      <DetailButton value={data.title} />
    </Wrapper>
  );
};
