import { FC } from 'react';
import { Title, Wrapper } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskAverageTimeResponse } from 'api/types';
import { formatCompletionTime } from '../utils';

export const OtherAverageTimeDetailStatistic: FC<
  Props<DashboardTaskAverageTimeResponse>
> = ({ item }) => {
  return (
    <Wrapper>
      <Title>
        {item.title}
        <div>{formatCompletionTime(item.averageCompletionTime || 0)}</div>
      </Title>
    </Wrapper>
  );
};
