import { FC } from 'react';
import { Name, NotClosedTasksCount, Wrapper } from './AnalyticsDetail.styled';
import { Props } from './AnalyticsDetail.types';
import { useUnit } from 'effector-react';
import { currentAnalyticsService } from 'services/supervisor/currentAnalytics/currentAnalyticsService.models';
import { useNavigate } from 'react-router-dom';

export const AnalyticsDetail: FC<Props> = ({
  data,
  hideExpired,
  malfunctionType,
  deviationType,
  resourceType,
  title,
}) => {
  const isDanger = data.expiredTasksCount !== 0;
  const { setFilters, filters } = useUnit({
    filters: currentAnalyticsService.outputs.$dashboardFilters,
    setFilters: currentAnalyticsService.inputs.setDashboardFilters,
  });
  const navigate = useNavigate();

  return (
    <Wrapper
      danger={isDanger}
      onClick={() => {
        if (filters.ManagementFirmId || filters.City) {
          navigate(`/tasks/list/Observing?housingStockId=${data.id}`);

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
