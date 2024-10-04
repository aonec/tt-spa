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
import { ResourceStatistic } from './ResourceStatistic';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { getRatioOfTasksCount } from './DashboardPanel.utils';

export const DashboardPanel: FC<Props> = ({ data }) => {
  const ratioOfTasksCount = getRatioOfTasksCount(data.details || []);

  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <RatioWrapper>
        <DangerWrapper isPositive={(ratioOfTasksCount?.danger || 0) > 0}>
          {ratioOfTasksCount?.danger}
        </DangerWrapper>{' '}
        / {ratioOfTasksCount?.all}
      </RatioWrapper>
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
