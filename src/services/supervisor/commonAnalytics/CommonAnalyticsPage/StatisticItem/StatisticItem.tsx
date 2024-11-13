import { FC } from 'react';
import {
  Count,
  Dictrict,
  More,
  Percentage,
  Resource,
  StatisticsWrapper,
  TitleWrapper,
  Wrapper,
} from './StatisticItem.styled';
import { Props } from './StatisticItem.types';
import { Chart } from './Chart';

export const StatisticItem: FC<Props> = ({ data }) => {
  const {
    chart,
    details,
    expiredTasksCount,
    title,
    totalTasksCount,
    totalTasksPercentage,
  } = data;

  return (
    <Wrapper>
      <TitleWrapper>
        <Dictrict>{title}</Dictrict>
        <Count>
          {totalTasksCount}
          <Percentage>{totalTasksPercentage}%</Percentage>
        </Count>
      </TitleWrapper>
      <StatisticsWrapper>
        <Chart chart={chart} />
        <Resource></Resource>
      </StatisticsWrapper>

      <More>Подробнее</More>
    </Wrapper>
  );
};
