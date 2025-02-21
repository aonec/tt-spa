import { FC } from 'react';
import {
  AnalyticsDetailWrapper,
  NotClosedTaskCount,
  ProgressSC,
  Title,
  Wrapper,
} from './ResourceStatistic.styled';
import { Props } from './ResourceStatistic.types';
import { DashboardTaskMalfunctionDetailsModel } from 'api/types';
import { AnalyticsDetail } from './AnalyticsDetail';
import { MalfunctionIcon } from './MalfunctionIcon';

export const MalfunctionDetail: FC<
  Props<DashboardTaskMalfunctionDetailsModel>
> = ({ data, title }) => {
  return (
    <Wrapper>
      <Title>
        <div>
          {data.malfunctionType && (
            <>
              <MalfunctionIcon type={data.malfunctionType} />{' '}
              {data.malfunctionTypeDescription}
            </>
          )}
        </div>
        <div>
          <NotClosedTaskCount isPositive={data.expiredTasksCount! > 0}>
            {data.expiredTasksCount}
          </NotClosedTaskCount>{' '}
          / {data.totalTasksCount}
        </div>
      </Title>
      <ProgressSC
        percent={(data.expiredTasksCount! / data.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#39437b'}
        size={['100%', 3]}
      />
      <AnalyticsDetailWrapper>
        {data.items?.map((item) => (
          <AnalyticsDetail
            key={item.id}
            data={item}
            title={title}
            malfunctionType={data.malfunctionType}
          />
        ))}
      </AnalyticsDetailWrapper>
    </Wrapper>
  );
};
