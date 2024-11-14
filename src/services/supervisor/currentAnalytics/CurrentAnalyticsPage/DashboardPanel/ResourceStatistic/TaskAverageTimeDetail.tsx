import { FC } from 'react';
import {
  AnalyticsDetailWrapper,
  NotClosedTaskCount,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { DashboardTaskAverageTimeDetailsModel } from 'api/types';
import { AnalyticsDetail } from './AnalyticsDetail';
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
          {Number(data.averageCompletionTime).toFixed(1).replace('.', ',')}
        </NotClosedTaskCount>{' '}
      </Title>

      <AnalyticsDetailWrapper>
        {data.items?.map((data) => (
          <AnalyticsDetail hideExpired data={data} />
        ))}
      </AnalyticsDetailWrapper>
    </Wrapper>
  );
};
