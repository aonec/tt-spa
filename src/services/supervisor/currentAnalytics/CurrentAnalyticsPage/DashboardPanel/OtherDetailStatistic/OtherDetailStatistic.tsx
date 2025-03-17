import { FC } from 'react';
import { NotClosedTaskCount, Title } from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskResourceResponse } from 'api/types';
import { ProgressSC } from '../ResourceStatistic/ResourceStatistic.styled';
import { DetailButton } from '../DetailButton';

export const OtherDetailStatistic: FC<Props<DashboardTaskResourceResponse>> = ({
  item,
}) => {
  return (
    <DetailButton value={item.title}>
      <Title>
        {item.title}
        <div>
          <NotClosedTaskCount isPositive={item.expiredTasksCount! > 0}>
            {item.expiredTasksCount}
          </NotClosedTaskCount>{' '}
          / {item.totalTasksCount}
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
