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
        <div>
          {/* <NotClosedTaskCount isPositive={item.expiredTasksCount! > 0}>
            {item.expiredTasksCount}
          </NotClosedTaskCount>{' '}
          / {item.totalTasksCount} */}
          {item.averageCompletionTime}
        </div>
      </Title>
      {/* <Progress
        percent={(item.expiredTasksCount! / item.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      /> */}
    </Wrapper>
  );
};
