import { FC } from 'react';
import { Title, Wrapper } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskAverageTimeResponse } from 'api/types';

export const OtherAverageTimeDetailStatistic: FC<
  Props<DashboardTaskAverageTimeResponse>
> = ({ item }) => {
  return (
    <Wrapper>
      <Title>
        {item.title}
        <div>{item.averageCompletionTime}</div>
      </Title>
    </Wrapper>
  );
};
