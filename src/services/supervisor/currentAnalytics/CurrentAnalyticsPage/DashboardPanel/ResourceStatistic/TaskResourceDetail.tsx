import { FC } from 'react';
import {
  AnalyticsDetailWrapper,
  NotClosedTaskCount,
  ProgressSC,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { DashboardTaskResourceDetailsModel } from 'api/types';
import { AnalyticsDetail } from './AnalyticsDetail';

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
          <NotClosedTaskCount isPositive={data.expiredTasksCount! > 0}>
            {data.expiredTasksCount}
          </NotClosedTaskCount>{' '}
          / {data.totalTasksCount}
        </div>
      </Title>
      <ProgressSC
        percent={(data.expiredTasksCount! / data.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />
      <AnalyticsDetailWrapper>
        {data.items?.map((item) => (
          <AnalyticsDetail
            key={item.id}
            data={item}
            resourceType={data?.resourceType}
          />
        ))}
      </AnalyticsDetailWrapper>
    </Wrapper>
  );
};
