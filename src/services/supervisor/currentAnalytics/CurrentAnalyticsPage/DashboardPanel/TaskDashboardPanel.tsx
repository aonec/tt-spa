import { FC } from 'react';
import {
  DangerWrapper,
  RatioWrapper,
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { TaskResourceDetail } from './ResourceStatistic';
import { getRatioOfTasksCountByOthers } from './DashboardPanel.utils';
import { OtherDetailStatistic } from './OtherDetailStatistic';
import { DashboardTaskResourceResponse } from 'api/types';
import { DetailButton } from './DetailButton';

export const TaskDashboardPanel: FC<Props<DashboardTaskResourceResponse>> = ({
  data,
  otherData,
}) => {
  if (otherData) {
    const ratioOfOthers = getRatioOfTasksCountByOthers(otherData);

    return (
      <Wrapper>
        <Title>Прочие</Title>
        <RatioWrapper>
          <DangerWrapper isPositive={(ratioOfOthers?.danger || 0) > 0}>
            {ratioOfOthers?.danger}
          </DangerWrapper>{' '}
          / {ratioOfOthers?.all}
        </RatioWrapper>
        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherDetailStatistic key={item.title} item={item} />
          ))}
        </ResourceStatisticsWrapper>
      </Wrapper>
    );
  }

  if (!data) return null;

  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <RatioWrapper>
        <DangerWrapper isPositive={(data.expiredTasksCount || 0) > 0}>
          {data.expiredTasksCount}
        </DangerWrapper>{' '}
        / {data.totalTasksCount}
      </RatioWrapper>
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <TaskResourceDetail
            data={detail}
            title={data.title}
            key={detail.resourceType}
          />
        ))}
      </ResourceStatisticsWrapper>
      <DetailButton value={data.title} />
    </Wrapper>
  );
};
