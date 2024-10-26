import { FC } from 'react';
import {
  AnalitycsDetailWrapper,
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { DashboardTaskAverageTimeDetailsModel } from 'api/types';
import { AnalitycsDetail } from './AnalyticsDetail';
import { MalfunctionIcon } from './MalfunctionIcon';

export const TaskAverageTimeDetail: FC<
  Props<DashboardTaskAverageTimeDetailsModel>
> = ({ data }) => {
  return (
    <Wrapper>
      <Title>
        <div>
          {data.malfunctionType && (
            <>
              {<MalfunctionIcon type={data.malfunctionType} />}{' '}
              {data.malfunctionTypeDescription}
            </>
          )}
        </div>
        <NotClosedTaskCount isPositive={false}>
          {data.averageCompletionTime}
        </NotClosedTaskCount>{' '}
      </Title>

      <AnalitycsDetailWrapper>
        {data.items?.map((data) => (
          <AnalitycsDetail hideExpired data={data} />
        ))}
      </AnalitycsDetailWrapper>
    </Wrapper>
  );
};
