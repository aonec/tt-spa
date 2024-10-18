import { FC } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';

export const AnalyticsDetail: FC<Props> = ({ data }) => {
  const isDanger = data.notClosedTasksCount !== 0;

  return (
    <Wrapper danger={isDanger}>
      <Name>{data.name}</Name>
      <div>
        <NotClosedTasksCount danger={isDanger}>
          {data.notClosedTasksCount}
        </NotClosedTasksCount>{' '}
        / {data.totalTasksCount}
      </div>
    </Wrapper>
  );
};
