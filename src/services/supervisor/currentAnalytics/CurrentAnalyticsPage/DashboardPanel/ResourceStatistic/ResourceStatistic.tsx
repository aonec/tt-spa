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
import { getRatioOfTasksCount } from './ResourceStatistic.utils';

export const ResourceStatistic: FC<Props> = ({ data }) => {
  const ratio = getRatioOfTasksCount(data);

  return (
    <Wrapper>
      {data.resourceType && (
        <Title>
          <ResourceInfo
            resource={data.resourceType as unknown as EResourceType}
          />
          <div>
            <NotClosedTaskCount isPositive={ratio?.danger! > 0}>
              {ratio?.danger}
            </NotClosedTaskCount>{' '}
            / {ratio?.all}
          </div>
        </Title>
      )}
      <Progress
        percent={(ratio?.danger! / ratio?.all!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        // '#f5222d'
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
