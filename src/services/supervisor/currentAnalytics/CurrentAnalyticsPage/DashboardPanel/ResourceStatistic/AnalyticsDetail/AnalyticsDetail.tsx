import { FC, useCallback } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';
import { useUnit } from 'effector-react';
import { currentAnalyticsService } from 'services/supervisor/currentAnalytics/currentAnalyticsService.models';
import { useNavigate } from 'react-router-dom';
import { dashboardSummaryQuery } from 'services/supervisor/currentAnalytics/currentAnalyticsService.api';
import queryString from 'query-string';
import { getTasksFilters } from './AnalyticsDetail.utils';

export const AnalyticsDetail: FC<Props> = ({
  data,
  hideExpired,
  malfunctionType,
  resourceType,
  deviationType,
  title,
}) => {
  const isDanger = data.expiredTasksCount !== 0;

  const { setFilters, dashboardSummary, dashboardType } = useUnit({
    filters: currentAnalyticsService.outputs.$dashboardFilters,
    setFilters: currentAnalyticsService.inputs.setDashboardFilters,
    dashboardSummary: dashboardSummaryQuery.$data,
    dashboardType: currentAnalyticsService.outputs.$currentDashboardType,
  });

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (
      dashboardSummary?.breadCrumbs?.managingFirmId ||
      dashboardSummary?.breadCrumbs?.city
    ) {
      const queryStr = queryString.stringify({
        city: dashboardSummary?.breadCrumbs?.city,
        street: data.label,
        ...getTasksFilters({
          dashboardType,
          resourceType,
          malfunctionType,
        }),
      });

      navigate(`/tasks/list/Observing?${queryStr}`);

      return;
    }

    setFilters({
      City: title,
      ManagementFirmId: data.id,
      DeviationType: deviationType,
      MalfunctionType: malfunctionType,
      ResourceType: resourceType,
    });
  }, [
    dashboardSummary,
    dashboardType,
    data,
    deviationType,
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
