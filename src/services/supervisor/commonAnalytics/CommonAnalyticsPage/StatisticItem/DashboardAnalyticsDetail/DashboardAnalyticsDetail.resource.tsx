import { FC } from 'react';
import {
  AnalyticsDetailWrapper,
  NotClosedTaskCount,
  ProgressSC,
  Title,
  Wrapper,
} from './DashboardAnalyticsDetail.styled';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { DashboardTaskResourceDetailsModel } from 'api/types';
import { AnalyticsDetail } from './AnalyticsDetail';
import { Props } from './DashboardAnalyticsDetail.types';

export const DashboardResourceAnalyticsDetail: FC<
  Props<DashboardTaskResourceDetailsModel>
> = ({ data, title }) => {
  return (
    <Wrapper>
      <Title>
        <div>
          {data?.resourceType && <ResourceInfo resource={data.resourceType} />}
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
        strokeColor={'#39437b'}
        size={['100%', 3]}
      />
      <AnalyticsDetailWrapper>
        {data.items?.map((item) => (
          <AnalyticsDetail
            key={item.id}
            data={item}
            title={title}
            resourceType={data.resourceType}
          />
        ))}
      </AnalyticsDetailWrapper>
    </Wrapper>
  );
};
