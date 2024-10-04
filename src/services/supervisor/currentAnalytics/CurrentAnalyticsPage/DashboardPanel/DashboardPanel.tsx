import { FC } from 'react';
import {
  ResourceStatisticsWrapper,
  Title,
  Wrapper,
} from './DashboardPanel.styled';
import { Props } from './DashboardPanel.types';
import { ResourceStatistic } from './ResourceStatistic';

export const DashboardPanel: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <ResourceStatisticsWrapper>
        {data.details?.map((detail) => (
          <ResourceStatistic data={detail} />
        ))}
      </ResourceStatisticsWrapper>
    </Wrapper>
  );
};
