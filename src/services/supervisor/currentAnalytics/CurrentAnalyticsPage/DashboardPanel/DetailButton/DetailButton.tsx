import { FC, useMemo } from 'react';
import { Props } from './DetailButton.types';
import { useUnit } from 'effector-react';
import { currentAnalyticsService } from 'services/supervisor/currentAnalytics/currentAnalyticsService.models';
import { dashboardSummaryQuery } from 'services/supervisor/currentAnalytics/currentAnalyticsService.api';
import { LinkButtonWrapper } from '../DashboardPanel.styled';
import { LinkButton } from 'ui-kit/shared/LinkButton';

const { inputs } = currentAnalyticsService;

export const DetailButton: FC<Props> = ({ value }) => {
  const { setDashboardFilters, summary } = useUnit({
    setDashboardFilters: inputs.setDashboardFilters,
    summary: dashboardSummaryQuery.$data,
  });

  const isShow = useMemo(() => {
    return !summary?.breadCrumbs?.city && !summary?.breadCrumbs?.managingFirmId;
  }, [summary?.breadCrumbs?.city, summary?.breadCrumbs?.managingFirmId]);

  if (!isShow || !value) return null;

  return (
    <LinkButtonWrapper>
      <LinkButton onClick={() => setDashboardFilters({ City: value })}>
        Подробнее
      </LinkButton>
    </LinkButtonWrapper>
  );
};
