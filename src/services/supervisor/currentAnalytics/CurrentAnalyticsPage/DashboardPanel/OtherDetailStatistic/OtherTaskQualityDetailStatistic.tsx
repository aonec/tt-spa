import { FC } from 'react';
import { Title, Wrapper } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskQualityResponse } from 'api/types';
import { ProgressSC } from '../ResourceStatistic/ResourceStatistic.styled';

export const OtherTaskQualityDetailStatistic: FC<
  Props<DashboardTaskQualityResponse>
> = ({ item }) => {
  return (
    <Wrapper>
      <Title>
        {item.title}
        <div>
          {item.expiredTasksCount} / {item.totalTasksCount}
        </div>
      </Title>
      <ProgressSC
        percent={(item.expiredTasksCount! / item.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />
    </Wrapper>
  );
};
