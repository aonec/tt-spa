import { FC } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';
import { useUnit } from 'effector-react';
import { currentAnalyticsService } from 'services/supervisor/currentAnalytics/currentAnalyticsService.models';
import { useNavigate } from 'react-router-dom';
import { dashboardSummaryQuery } from 'services/supervisor/currentAnalytics/currentAnalyticsService.api';
import { stringify } from 'query-string';

export const AnalyticsDetail: FC<Props> = ({
  data,
  hideExpired,
  malfunctionType,
  deviationType,
  resourceType,
  title,
}) => {
  const isDanger = data.expiredTasksCount !== 0;
  const { setFilters, dashboardSummary } = useUnit({
    filters: currentAnalyticsService.outputs.$dashboardFilters,
    setFilters: currentAnalyticsService.inputs.setDashboardFilters,
    dashboardSummary: dashboardSummaryQuery.$data,
  });
  const navigate = useNavigate();

  return (
    <Wrapper
      danger={isDanger}
      onClick={() => {
        if (
          dashboardSummary?.breadCrumbs?.managingFirmId ||
          dashboardSummary?.breadCrumbs?.city
        ) {
          const queryString = stringify({
            city: dashboardSummary?.breadCrumbs?.city,
            street: data.label,
          });
          navigate(`/tasks/list/Observing?${queryString}`);

          return;
        }

        setFilters({
          City: title,
          ManagementFirmId: data.id,
          DeviationType: deviationType,
          MalfunctionType: malfunctionType,
          ResourceType: resourceType,
        });
      }}
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
