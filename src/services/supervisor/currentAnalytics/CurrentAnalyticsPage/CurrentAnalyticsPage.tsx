import { FC, useMemo } from 'react';
import { DashboardPanelWrapper, Wrapper } from './CurrentAnalyticsPage.styled';
import { Props } from './CurrentAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from './AnalyticsSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { InfoOptionsPanels } from './InfoOptionsPanels';
import { splitArrayForDashboard } from './CurrentAnalyticsPage.utils';
import { TaskDashboardPanel } from './DashboardPanel';
import { DashboardDataType } from '../currentAnalyticsService.types';

export const CurrentAnalyticsPage: FC<Props> = ({
  isLoading,
  isLoadingPanels,
  dashboardSummary,
  currentDashboardType,
  setCurrentDashboardType,
  dashboardPiperuptersList,
  dashboardResourceDisconnection,
  dashboardMalfunctions,
}) => {
  const Dashboard = useMemo(() => {
    const dataMap = {
      [DashboardDataType.PipeRupturesCount]: () => {
        if (!dashboardPiperuptersList) return;

        const dashboardData = splitArrayForDashboard(dashboardPiperuptersList);

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <TaskDashboardPanel data={data} />
            ))}
            {dashboardData?.others && (
              <TaskDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.ResourceDisconnectsCount]: () => {
        if (!dashboardMalfunctions) return;

        const dashboardData = splitArrayForDashboard(dashboardMalfunctions);

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <TaskDashboardPanel data={data} />
            ))}
            {dashboardData?.others && (
              <TaskDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.MalfunctionsCount]: () => {
        if (!dashboardResourceDisconnection) return;

        const dashboardData = splitArrayForDashboard(
          dashboardResourceDisconnection,
        );

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <TaskDashboardPanel data={data} />
            ))}
            {dashboardData?.others && (
              <TaskDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.AverageCompletionTime]: null,
      [DashboardDataType.TasksCount]: null,
    };

    return dataMap[currentDashboardType];
  }, [
    currentDashboardType,
    dashboardMalfunctions,
    dashboardPiperuptersList,
    dashboardResourceDisconnection,
  ]);

  return (
    <Wrapper>
      <PageHeader title="Текущая ситуация" contextMenu={{}} />
      <AnalyticsSearch />
      <InfoOptionsPanels
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
      />
      <WithLoader isLoading={isLoading || isLoadingPanels}>
        <DashboardPanelWrapper>
          {Dashboard && <Dashboard />}
        </DashboardPanelWrapper>
      </WithLoader>
    </Wrapper>
  );
};
