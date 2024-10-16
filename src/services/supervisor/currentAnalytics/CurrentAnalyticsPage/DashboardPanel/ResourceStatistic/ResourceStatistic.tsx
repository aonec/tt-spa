import { FC } from 'react';
import {
  AnalitycsDetailWrapper,
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { EResourceType } from 'api/types';
import { Progress } from 'antd';
import { AnalitycsDetail } from './AnalyticsDetail';

export const ResourceStatistic: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      {data.resourceType && (
        <Title>
          <ResourceInfo
            resource={data.resourceType as unknown as EResourceType}
          />
          <div>
            <NotClosedTaskCount isPositive={data.notClosedTasksCount! > 0}>
              {data.notClosedTasksCount}
            </NotClosedTaskCount>{' '}
            / {data.totalTasksCount}
          </div>
        </Title>
      )}
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
