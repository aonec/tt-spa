import { FC } from 'react';
import { Title } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskQualityResponse } from 'api/types';
import { ProgressSC } from '../ResourceStatistic/ResourceStatistic.styled';
import { DetailButton } from '../DetailButton';

export const OtherTaskQualityDetailStatistic: FC<
  Props<DashboardTaskQualityResponse>
> = ({ item }) => {
  return (
    <DetailButton value={item.title}>
      <Title>
        {item.title}
        <div>
          {item.expiredTasksCount} / {item.totalTasksCount}
        </div>
      </Title>
      <ProgressSC
        percent={(item.expiredTasksCount! / item.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#39437b'}
        size={['100%', 3]}
      />
    </DetailButton>
  );
};
