import { FC } from 'react';
import {
  Count,
  Dictrict,
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
            <Skeleton.Button active={true} style={{ width: 180, height: 26 }} />
          ) : (
            'Нет данных за выбранный период'
          )}
        </Dictrict>
        <Count>
          {isLoading && (
            <Skeleton.Button active={true} style={{ width: 90, height: 34 }} />
          )}
        </Count>
      </TitleWrapper>
      <StatisticsWrapper>
        <Chart chart={null} />
        {isLoading && (
          <Resource>
            <Skeleton.Input active size="small" style={{ width: 120 }} />
            <Skeleton.Input active size="large" style={{ width: 260 }} />
            <Skeleton.Input active size="small" />
            <Skeleton.Input active size="large" style={{ width: 220 }} />
          </Resource>
        )}
      </StatisticsWrapper>
    </Wrapper>
  );
};
