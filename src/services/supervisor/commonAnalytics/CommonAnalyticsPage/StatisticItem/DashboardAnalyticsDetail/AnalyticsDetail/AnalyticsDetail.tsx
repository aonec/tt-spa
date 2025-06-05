import { FC, useCallback } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';
import { useUnit } from 'effector-react';
import { commonAnalyticsService } from 'services/supervisor/commonAnalytics/commonAnalyticsService.models';
import { getTasksFilters } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/DashboardPanel/ResourceStatistic/AnalyticsDetail/AnalyticsDetail.utils';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

export const AnalyticsDetail: FC<Props> = ({
  data,
  hideExpired,
  title,
  resourceType,
  malfunctionType,
}) => {
  const isDanger = data.expiredTasksCount !== 0;

  const { filters, setFilters, dashboardType } = useUnit({
    filters: commonAnalyticsService.outputs.$dashboardFilters,
    setFilters: commonAnalyticsService.inputs.setDashboardFilters,
    dashboardType: commonAnalyticsService.outputs.$currentDashboardType,
  });

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (!filters.ManagementFirmId) {
      setFilters({ ManagementFirmId: data.id, City: title });

      return;
    }

    const queryStr = queryString.stringify({
      city: filters.City,
      street: data.label,
      ...getTasksFilters({
        dashboardType,
        resourceType,
        malfunctionType,
      }),
    });
    navigate(`/tasks/list/Observing?${queryStr}`);
  }, [
    dashboardType,
    data.id,
    data.label,
    filters.City,
    filters.ManagementFirmId,
    malfunctionType,
    navigate,
    resourceType,
    setFilters,
    title,
  ]);

  return (
    <Wrapper danger={isDanger} onClick={handleClick}>
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
