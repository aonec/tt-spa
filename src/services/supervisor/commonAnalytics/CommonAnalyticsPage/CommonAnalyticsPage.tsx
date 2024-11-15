import { FC, useMemo, useState } from 'react';
import { Wrapper } from './CommonAnalyticsPage.styled';
import { Props } from './CommonAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch';
import { InfoOptionsPanels } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/InfoOptionsPanels';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { GoBackPure } from 'ui-kit/shared/GoBack/GoBack';
import { StatisticItem } from './StatisticItem';
import { EmptyStatisticItem } from './EmptyStatisticItem';
import { EDateRange } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch/AnalyticsSearch.types';

export const CommonAnalyticsPage: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  managementFirms,
  resetDashboardFilters,
  currentDashboardType,
  dashboardSummary,
  setCurrentDashboardType,
  isLoading,
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
        managementFirms={managementFirms}
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
      />
      {isEmpty && <EmptyStatisticItem isLoading={isLoading} />}
      {!isLoading &&
        analyticsData?.map((analyticsData) => (
          <StatisticItem data={analyticsData} selectValue={selectValue} />
        ))}
    </Wrapper>
  );
};
