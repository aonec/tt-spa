import { FC } from 'react';
import {
  LinkButtonWrapper,
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { TaskAverageTimeDetail } from './ResourceStatistic';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { DashboardTaskAverageTimeResponse } from 'api/types';
import {
  AverageTime,
  AverageTimeDescription,
} from './ResourceStatistic/ResourceStatistic.styled';
import { OtherAverageTimeDetailStatistic } from './OtherDetailStatistic/OtherAverageTimeDetailStatistic';
import { DetailButton } from './DetailButton';

export const AverageTimeDashboardPanel: FC<
  Props<DashboardTaskAverageTimeResponse>
> = ({ data, otherData }) => {
  if (otherData?.length) {
    return (
      <Wrapper>
        <Title>Остальные округа</Title>
        <AverageTime>
          {String(
            otherData.reduce(
              (acc, elem) =>
                acc +
                (elem?.averageCompletionTime
                  ? Number(elem?.averageCompletionTime)
                  : 0),
              0,
            ) / otherData.length,
          ).replace('.', ',')}{' '}
          <AverageTimeDescription>мин</AverageTimeDescription>
        </AverageTime>
        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherAverageTimeDetailStatistic item={item} />
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
        {Number(data.averageCompletionTime).toFixed(1).replace('.', ',')}{' '}
        <AverageTimeDescription>мин</AverageTimeDescription>
      </AverageTime>
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <TaskAverageTimeDetail data={detail} />
        ))}
      </ResourceStatisticsWrapper>
      <DetailButton value={data.title} />
    </Wrapper>
  );
};
