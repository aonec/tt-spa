import { FC } from 'react';
import { Title, Wrapper } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskQualityResponse } from 'api/types';

export const OtherTaskQualityDetailStatistic: FC<
  Props<DashboardTaskQualityResponse>
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
