import { FC } from 'react';
import {
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './OtherDeitalStatistic.styled';
import { Props } from './OtherDeitalStatistic.types';
import { Progress } from 'antd';

export const OtherDeitalStatistic: FC<Props> = ({ item }) => {
  return (
    <Wrapper>
      <Title>
        {item.name}
        <div>
          <NotClosedTaskCount isPositive={item.notClosedTasksCount! > 0}>
            {item.notClosedTasksCount}
          </NotClosedTaskCount>{' '}
          / {item.totalTasksCount}
        </div>
      </Title>
      <Progress
        percent={(item.notClosedTasksCount! / item.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
        size={['100%', 3]}
      />
    </Wrapper>
  );
};
