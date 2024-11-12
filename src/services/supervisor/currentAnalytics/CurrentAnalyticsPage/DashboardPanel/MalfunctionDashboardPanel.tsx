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
import { MalfunctionDetail } from './ResourceStatistic';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { getRatioOfTasksCountByOthers } from './DashboardPanel.utils';
import { OtherDetailStatistic } from './OtherDetailStatistic';
import { DashboardTaskMalfunctionResponse } from 'api/types';

export const MalfunctionDashboardPanel: FC<
  Props<DashboardTaskMalfunctionResponse>
> = ({ data, otherData }) => {
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
          <MalfunctionDetail data={detail} />
        ))}
      </ResourceStatisticsWrapper>
      <LinkButtonWrapper>
        <LinkButton onClick={() => void 0}>Подробнее</LinkButton>
      </LinkButtonWrapper>
    </Wrapper>
  );
};
