import { FC } from 'react';
import { AnalitycsDetailWrapper, Wrapper } from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { EResourceType } from 'api/types';
import { Progress } from 'antd';
import { AnalitycsDetail } from './AnalitycsDetail';

export const ResourceStatistic: FC<Props> = ({ data }) => {
  const status = Math.random() > 0.5 ? 'active' : 'exception';

  return (
    <Wrapper>
      {data.resourceType && (
        <>
          <ResourceInfo
            resource={data.resourceType as unknown as EResourceType}
          />
        </>
      )}
      <Progress
        percent={Math.random() * 100}
        showInfo={false}
        status={status}
        strokeColor={status === 'active' ? '#272F5A' : '#f5222d'}
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
