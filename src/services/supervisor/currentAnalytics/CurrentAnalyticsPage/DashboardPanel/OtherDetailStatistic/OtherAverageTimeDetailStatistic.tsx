import { FC } from 'react';
import { Title } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskAverageTimeResponse } from 'api/types';
import { formatCompletionTime } from '../utils';
import { DetailButton } from '../DetailButton';

export const OtherAverageTimeDetailStatistic: FC<
  Props<DashboardTaskAverageTimeResponse>
> = ({ item }) => {
  return (
    <DetailButton value={item.title}>
      <Title>
        {item.title}
        <div>{formatCompletionTime(item.averageCompletionTime || 0)}</div>
      </Title>
    </DetailButton>
  );
};
