import { FC } from 'react';
import {
  AnalitycsDetailWrapper,
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { DashboardTaskMalfunctionDetailsModel } from 'api/types';
import { Progress } from 'antd';
import { AnalitycsDetail } from './AnalyticsDetail';
import { MalfunctionIcon } from './MalfunctionIcon';

export const MalfunctionDetail: FC<
  Props<DashboardTaskMalfunctionDetailsModel>
> = ({ data }) => {
  return (
    <Wrapper>
      <Title>
        <div>
          {data.malfunctionType && (
            <>
              <MalfunctionIcon type={data.malfunctionType} />{' '}
              {data.malfunctionTypeDescription}
            </>
          )}
        </div>
        <div>
          <NotClosedTaskCount isPositive={data.notClosedTasksCount! > 0}>
            {data.notClosedTasksCount}
          </NotClosedTaskCount>{' '}
          / {data.totalTasksCount}
        </div>
      </Title>
      <Progress
        percent={(data.notClosedTasksCount! / data.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />
      <AnalitycsDetailWrapper>
        {data.items?.map((data) => (
          <AnalitycsDetail data={data} />
        ))}
      </AnalitycsDetailWrapper>
    </Wrapper>
  );
};
