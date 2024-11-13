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
} from './EmptyStatisticItem.styled';
import { Props } from './EmptyStatisticItem.types';
import { Chart } from '../StatisticItem/Chart';
import { Skeleton } from 'antd';

export const EmptyStatisticItem: FC<Props> = ({ isLoading }) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Dictrict>
          {isLoading ? (
            <Skeleton.Button active={true} size="small" />
          ) : (
            'Нет данных за выбранный период'
          )}
        </Dictrict>
        <Count>
          {isLoading && <Skeleton.Button active={true} size="default" />}
        </Count>
      </TitleWrapper>
      <StatisticsWrapper>
        <Chart chart={null} />
        <Resource></Resource>
      </StatisticsWrapper>

      <More>Подробнее</More>
    </Wrapper>
  );
};
