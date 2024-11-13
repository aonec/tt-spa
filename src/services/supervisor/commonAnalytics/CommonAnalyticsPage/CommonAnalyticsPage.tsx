import { FC, useMemo } from 'react';
import { Wrapper } from './CommonAnalyticsPage.styled';
import { Props } from './CommonAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch';
import { InfoOptionsPanels } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/InfoOptionsPanels';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { GoBackPure } from 'ui-kit/shared/GoBack/GoBack';
import { StatisticItem } from './StatisticItem';
import { EmptyStatisticItem } from './EmptyStatisticItem';

export const CommonAnalyticsPage: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  managementFirms,
  resetDashboardFilters,
  currentDashboardType,
  dashboardSummary,
  setCurrentDashboardType,
  piperuptersStatistics,
  isLoading,
}) => {
  const isEmpty = useMemo(
    () => !piperuptersStatistics || !piperuptersStatistics.length || isLoading,
    [piperuptersStatistics, isLoading],
  );

  return (
    <Wrapper>
      <PageHeader title="Общая аналитика" contextMenu={{}} />
      <AnalyticsSearch
        isCommon
        managementFirms={managementFirms}
        dashboardFilters={dashboardFilters}
        setDashboardFilters={setDashboardFilters}
        resetDashboardFilters={resetDashboardFilters}
      />
      <InfoOptionsPanels
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
      />
      {isEmpty && <EmptyStatisticItem isLoading={isLoading} />}
      {!isLoading &&
        piperuptersStatistics?.map((piperuptersStatistic) => (
          <StatisticItem data={piperuptersStatistic} />
        ))}
    </Wrapper>
  );
};
