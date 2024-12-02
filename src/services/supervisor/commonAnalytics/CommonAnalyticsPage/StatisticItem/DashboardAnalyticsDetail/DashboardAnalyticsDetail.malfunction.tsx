import { FC } from 'react';
import {
  AnalyticsDetailWrapper,
  NotClosedTaskCount,
  ProgressSC,
  Title,
  Wrapper,
} from './DashboardAnalyticsDetail.styled';
import { Props } from './DashboardAnalyticsDetail.types';
import { DashboardTaskMalfunctionDetailsModel } from 'api/types';
import { AnalyticsDetail } from './AnalyticsDetail';
import { MalfunctionIcon } from './MalfunctionIcon';

export const DashboardMalfunctionAnalyticsDetail: FC<
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
            {data.totalTasksCount}
          </NotClosedTaskCount>{' '}
          / {data.totalTasksCount}
        </div>
      </Title>
      <ProgressSC
        percent={(data.expiredTasksCount! / data.totalTasksCount!) * 100}
        showInfo={false}
        strokeColor={'#272F5A'}
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
