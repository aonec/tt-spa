import { FC, useMemo } from 'react';
import { Wrapper } from './CommonAnalyticsPage.styled';
import { Props } from './CommonAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/AnalyticsSearch';
import { InfoOptionsPanels } from 'services/supervisor/currentAnalytics/CurrentAnalyticsPage/InfoOptionsPanels';
import { StatisticItem } from './StatisticItem';
import { EmptyStatisticItem } from './EmptyStatisticItem';

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
  organizations,
  dateRangeType,
  setDateRangeType,
}) => {
  const isEmpty = useMemo(
    () => !analyticsData || !analyticsData.length || isLoading,
    [analyticsData, isLoading],
  );

  // const [selectValue, setValue] = useState(EDateRange.Week);

  return (
    <Wrapper>
      <PageHeader title="Общая аналитика" contextMenu={{}} />
      <AnalyticsSearch
        isCommon
        dashboardFilters={dashboardFilters}
        setDashboardFilters={setDashboardFilters}
        resetDashboardFilters={resetDashboardFilters}
        selectValue={dateRangeType}
        setValue={setDateRangeType}
        organizationsList={organizations}
      />
      <InfoOptionsPanels
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
        isLoading={isLoadingSummary}
      />
      {isEmpty && <EmptyStatisticItem isLoading={isLoading} />}
      {!isLoading &&
        analyticsData?.map?.((analyticsData) => (
          <StatisticItem
            key={analyticsData.title}
            data={analyticsData}
            selectValue={dateRangeType}
            currentDashboardType={currentDashboardType}
          />
        ))}
    </Wrapper>
  );
};
