import { FC } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';

export const AnalyticsDetail: FC<Props> = ({ data }) => {
  const isDanger = data.expiredTasksCount !== 0;

  return (
    <Wrapper danger={isDanger}>
      <Name>{data.label}</Name>
      <div>
        <NotClosedTasksCount danger={isDanger}>
          {data.expiredTasksCount}
        </NotClosedTasksCount>{' '}
        / {data.totalTasksCount}
      </div>
    </Wrapper>
  );
};
