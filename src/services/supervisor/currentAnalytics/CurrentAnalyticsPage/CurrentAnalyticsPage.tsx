import { FC, useMemo } from 'react';
import { DashboardPanelWrapper, Wrapper } from './CurrentAnalyticsPage.styled';
import { Props } from './CurrentAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from './AnalyticsSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { InfoOptionsPanels } from './InfoOptionsPanels';
import { splitArrayForDashboard } from './CurrentAnalyticsPage.utils';
import {
  MalfunctionDashboardPanel,
  TaskDashboardPanel,
} from './DashboardPanel';
import { DashboardDataType } from '../currentAnalyticsService.types';
import { AverageTimeDashboardPanel } from './DashboardPanel/AverageTimeDashboardPanel';
import { TaskQualityDashboardPanel } from './DashboardPanel/TaskQualityDashboardPanel';
import { GoBackPure } from 'ui-kit/shared/GoBack/GoBack';

export const CurrentAnalyticsPage: FC<Props> = ({
  isLoading,
  isLoadingPanels,
  managementFirms,
  dashboardSummary,
  currentDashboardType,
  setCurrentDashboardType,
  dashboardPiperuptersList,
  dashboardResourceDisconnection,
  dashboardMalfunctions,
  dashboardAverageTime,
  dashboardServiceQuality,
  dashboardFilters,
  setDashboardFilters,
  resetDashboardFilters,
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
            {Boolean(dashboardData?.others?.length) && (
              <TaskDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.ResourceDisconnectsCount]: () => {
        if (!dashboardResourceDisconnection) return;

        const dashboardData = splitArrayForDashboard(
          dashboardResourceDisconnection,
        );

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <TaskDashboardPanel data={data} />
            ))}
            {Boolean(dashboardData?.others.length) && (
              <TaskDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.MalfunctionsCount]: () => {
        if (!dashboardMalfunctions) return;

        const dashboardData = splitArrayForDashboard(dashboardMalfunctions);

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <MalfunctionDashboardPanel data={data} />
            ))}
            {Boolean(dashboardData?.others?.length) && (
              <MalfunctionDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.AverageCompletionTime]: () => {
        if (!dashboardAverageTime) return;

        const dashboardData = splitArrayForDashboard(dashboardAverageTime);

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <AverageTimeDashboardPanel data={data} />
            ))}
            {Boolean(dashboardData?.others?.length) && (
              <AverageTimeDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
      [DashboardDataType.TasksCount]: () => {
        if (!dashboardServiceQuality) return;

        const dashboardData = splitArrayForDashboard(dashboardServiceQuality);

        return (
          <>
            {dashboardData?.panels?.map((data) => (
              <TaskQualityDashboardPanel data={data} />
            ))}
            {Boolean(dashboardData?.others?.length) && (
              <TaskQualityDashboardPanel otherData={dashboardData.others} />
            )}
          </>
        );
      },
    };

    return dataMap[currentDashboardType];
  }, [
    currentDashboardType,
    dashboardAverageTime,
    dashboardMalfunctions,
    dashboardPiperuptersList,
    dashboardResourceDisconnection,
    dashboardServiceQuality,
  ]);

  return (
    <Wrapper>
      <PageHeader title="Текущая ситуация" contextMenu={{}} />
      <AnalyticsSearch
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
      <WithLoader isLoading={isLoading || isLoadingPanels}>
        {dashboardFilters.ManagementFirmId && (
          <GoBackPure
            onClick={() => setDashboardFilters({ ManagementFirmId: null })}
          />
        )}
        <DashboardPanelWrapper>
          {Dashboard && <Dashboard />}
        </DashboardPanelWrapper>
      </WithLoader>
    </Wrapper>
  );
};
