import { FC } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalitycsDetail.styled';
import { Props } from './AnalitycsDetail.types';

export const AnalitycsDetail: FC<Props> = ({ data }) => {
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
