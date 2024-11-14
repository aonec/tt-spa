import { FC } from 'react';
import {
  DangerWrapper,
  LinkButtonWrapper,
  RatioWrapper,
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { TaskResourceDetail } from './ResourceStatistic';
import { LinkButton } from 'ui-kit/shared/LinkButton';
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
        <Title>Остальные округа</Title>
        <RatioWrapper>
          <DangerWrapper isPositive={(ratioOfOthers?.danger || 0) > 0}>
            {ratioOfOthers?.danger}
          </DangerWrapper>{' '}
          / {ratioOfOthers?.all}
        </RatioWrapper>
        <ResourceStatisticsWrapper>
          {otherData.map((item) => (
            <OtherDetailStatistic item={item} />
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
      <RatioWrapper>
        <DangerWrapper isPositive={(data.expiredTasksCount || 0) > 0}>
          {data.expiredTasksCount}
        </DangerWrapper>{' '}
        / {data.totalTasksCount}
      </RatioWrapper>
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <TaskResourceDetail data={detail} />
        ))}
      </ResourceStatisticsWrapper>
      <DetailButton value={data.title} />
    </Wrapper>
  );
};
