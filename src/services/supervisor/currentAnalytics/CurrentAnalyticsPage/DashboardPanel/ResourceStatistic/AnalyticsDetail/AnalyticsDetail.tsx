import { FC } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';
import { useUnit } from 'effector-react';
import { currentAnalyticsService } from 'services/supervisor/currentAnalytics/currentAnalyticsService.models';

export const AnalyticsDetail: FC<Props> = ({ data, hideExpired }) => {
  const isDanger = data.expiredTasksCount !== 0;
  const setFilters = useUnit(
    currentAnalyticsService.inputs.setDashboardFilters,
  );

  return (
    <Wrapper
      danger={isDanger}
      onClick={() => setFilters({ ManagementFirmId: data.id })}
    >
      <Name>{data.label}</Name>
      <div>
        {!hideExpired && (
          <NotClosedTasksCount danger={isDanger}>
            {data.expiredTasksCount}
          </NotClosedTasksCount>
        )}{' '}
        {!hideExpired && '/'} {data.totalTasksCount}
      </div>
    </Wrapper>
  );
};
