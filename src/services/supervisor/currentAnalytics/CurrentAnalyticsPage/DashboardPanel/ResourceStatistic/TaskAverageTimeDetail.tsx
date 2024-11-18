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
import { formatCompletionTime } from '../utils';

export const TaskAverageTimeDetail: FC<
  Props<DashboardTaskAverageTimeDetailsModel>
> = ({ data, title }) => {
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
          {formatCompletionTime(data.averageCompletionTime || 0)}
        </NotClosedTaskCount>{' '}
      </Title>

      <AnalyticsDetailWrapper>
        {data.items?.map((item) => (
          <AnalyticsDetail
            key={item.id}
            hideExpired
            data={item}
            title={title}
            malfunctionType={data.malfunctionType}
          />
        ))}
      </AnalyticsDetailWrapper>
    </Wrapper>
  );
};
