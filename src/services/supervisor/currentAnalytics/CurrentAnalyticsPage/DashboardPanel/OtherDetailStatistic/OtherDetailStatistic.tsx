import { FC } from 'react';
import {
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './OtherDetailStatistic.styled';
import { Props } from './OtherDetailStatistic.types';
import { Progress } from 'antd';
import { DashboardTaskResourceResponse } from 'api/types';

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
      <Progress
        percent={(item.expiredTasksCount! / item.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />
    </Wrapper>
  );
};
