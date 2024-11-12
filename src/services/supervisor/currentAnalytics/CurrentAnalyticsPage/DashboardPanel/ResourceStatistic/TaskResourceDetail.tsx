import { FC } from 'react';
import {
  AnalitycsDetailWrapper,
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { DashboardTaskResourceDetailsModel } from 'api/types';
import { Progress } from 'antd';
import { AnalitycsDetail } from './AnalyticsDetail';

export const TaskResourceDetail: FC<
  Props<DashboardTaskResourceDetailsModel>
> = ({ data }) => {
  return (
    <Wrapper>
      <Title>
        <div>
          {data?.resourceType && (
            <ResourceInfo resource={(data as any).resourceType as any} />
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
