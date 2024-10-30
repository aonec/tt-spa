import { FC } from 'react';
import {
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { DashboardTaskResourceResponse } from 'api/types';
import { ProgressSC } from '../ResourceStatistic/ResourceStatistic.styled';

export const OtherDetailStatistic: FC<Props<DashboardTaskResourceResponse>> = ({
  item,
}) => {
  return (
    <Wrapper>
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
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />
    </Wrapper>
  );
};
