import { FC, useMemo, useState } from 'react';
import { Wrapper } from './CommonAnalyticsPage.styled';
import { Props } from './CommonAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch';
import { InfoOptionsPanels } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/InfoOptionsPanels';
import { StatisticItem } from './StatisticItem';
import { EmptyStatisticItem } from './EmptyStatisticItem';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';

export const CommonAnalyticsPage: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  resetDashboardFilters,
  currentDashboardType,
  dashboardSummary,
  setCurrentDashboardType,
  isLoading,
  isLoadingSummary,
  analyticsData,
}) => {
  const isEmpty = useMemo(
    () => !analyticsData || !analyticsData.length || isLoading,
    [analyticsData, isLoading],
  );

  const [selectValue, setValue] = useState(EDateRange.Week);

  return (
    <Wrapper>
      <PageHeader title="Общая аналитика" contextMenu={{}} />
      <AnalyticsSearch
        isCommon
        dashboardFilters={dashboardFilters}
        setDashboardFilters={setDashboardFilters}
        resetDashboardFilters={resetDashboardFilters}
        selectValue={selectValue}
        setValue={setValue}
      />
      <InfoOptionsPanels
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
        isLoading={isLoadingSummary}
      />
      {isEmpty && <EmptyStatisticItem isLoading={isLoading} />}
      {!isLoading &&
        analyticsData?.map((analyticsData) => (
          <StatisticItem
            data={analyticsData}
            selectValue={selectValue}
            currentDashboardType={currentDashboardType}
          />
        ))}
    </Wrapper>
  );
};
