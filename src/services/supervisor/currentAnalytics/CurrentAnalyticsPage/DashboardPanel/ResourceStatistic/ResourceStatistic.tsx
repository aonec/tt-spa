import { FC } from 'react';
import { Wrapper } from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { EResourceType } from 'api/types';

export const ResourceStatistic: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      {data.resourceType && (
        <>
          <ResourceInfo
            resource={data.resourceType as unknown as EResourceType}
          />
        </>
      )}
    </Wrapper>
  );
};
