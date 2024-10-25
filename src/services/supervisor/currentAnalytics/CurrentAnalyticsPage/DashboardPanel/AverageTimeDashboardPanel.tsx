import { FC } from 'react';
import {
  LinkButtonWrapper,
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { ResourceStatistic } from './ResourceStatistic';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { DashboardTaskAverageTimeResponse } from 'api/types';

export const AverageTimeDashboardPanel: FC<
  Props<DashboardTaskAverageTimeResponse>
> = ({ data, otherData }) => {
  if (otherData) {
    return (
      <Wrapper>
        <Title>Остальные округа</Title>
        {/* <RatioWrapper>
          <DangerWrapper isPositive={(ratioOfOthers?.danger || 0) > 0}>
            {ratioOfOthers?.danger}
          </DangerWrapper>{' '}
          / {ratioOfOthers?.all}
        </RatioWrapper> */}
        <ResourceStatisticsWrapper>
          {/* {otherData.map((item) => (
            <OtherDeitalStatistic item={item} />
          ))} */}
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
      {/* <RatioWrapper>
        <DangerWrapper isPositive={(data.expiredTasksCount || 0) > 0}>
          {data.expiredTasksCount}
        </DangerWrapper>{' '}
        / {data.totalTasksCount}
      </RatioWrapper> */}
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <ResourceStatistic data={detail} />
        ))}
      </ResourceStatisticsWrapper>
      <LinkButtonWrapper>
        <LinkButton onClick={() => void 0}>Подробнее</LinkButton>
      </LinkButtonWrapper>
    </Wrapper>
  );
};
