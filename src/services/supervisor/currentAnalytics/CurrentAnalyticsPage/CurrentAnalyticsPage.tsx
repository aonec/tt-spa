import { FC } from 'react';
import { DashboardPanelWrapper, Wrapper } from './CurrentAnalyticsPage.styled';
import { Props } from './CurrentAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from './AnalyticsSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { InfoOptionsPanels } from './InfoOptionsPanels';
import { splitArrayForDashboard } from './CurrentAnalyticsPage.utils';
import { DashboardPanel } from './DashboardPanel';

export const CurrentAnalyticsPage: FC<Props> = ({
  isLoading,
  dashboardSummary,
  currentDashboardType,
  setCurrentDashboardType,
  dashboardPiperuptersList,
}) => {
  const dashboardData =
    dashboardPiperuptersList &&
    splitArrayForDashboard(dashboardPiperuptersList);

  return (
    <Wrapper>
      <PageHeader title="Текущая ситуация" contextMenu={{}} />
      <AnalyticsSearch />
      <InfoOptionsPanels
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
      />
      <WithLoader isLoading={isLoading}>
        <DashboardPanelWrapper>
          {dashboardData?.panels?.map((data) => (
            <DashboardPanel data={data} />
          ))}
          {dashboardData?.others && (
            <DashboardPanel otherData={dashboardData.others} />
          )}
        </DashboardPanelWrapper>
      </WithLoader>
    </Wrapper>
  );
};
