import { useUnit } from 'effector-react';
import { CurrentAnalyticsPage } from './CurrentAnalyticsPage';
import {
  dashboardAverageTimeQuery,
  dashboardMalfunctionsQuery,
  dashboardPiperuptersQuery,
  dashboardResourceDisconnectionQuery,
  dashboardSummaryQuery,
} from './currentAnalyticsService.api';
import { currentAnalyticsService } from './currentAnalyticsService.models';

const {
  inputs,
  outputs,
  gates: { CurrentAnalyticsGate },
} = currentAnalyticsService;

export const CurrentAnalyticsContainer = () => {
  const {
    dashboardSummary,
    isLoadingSummary,
    currentDashboardType,
    setCurrentDashboardType,
    dashboardPiperuptersList,
    isLoadingPanels,
    dashboardResourceDisconnection,
    dashboardMalfunctions,
    dashboardAverageTime,
  } = useUnit({
    dashboardSummary: dashboardSummaryQuery.$data,
    isLoadingSummary: dashboardSummaryQuery.$pending,
    currentDashboardType: outputs.$currentDashboardType,
    setCurrentDashboardType: inputs.setCurrentDashboardType,
    dashboardPiperuptersList: dashboardPiperuptersQuery.$data,
    dashboardResourceDisconnection: dashboardResourceDisconnectionQuery.$data,
    dashboardMalfunctions: dashboardMalfunctionsQuery.$data,
    dashboardAverageTime: dashboardAverageTimeQuery.$data,
    isLoadingPanels: outputs.$isLoading,
  });

  return (
    <>
      <CurrentAnalyticsGate />
      <CurrentAnalyticsPage
        dashboardSummary={dashboardSummary}
        isLoading={isLoadingSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
        dashboardPiperuptersList={dashboardPiperuptersList}
        dashboardResourceDisconnection={dashboardResourceDisconnection}
        dashboardMalfunctions={dashboardMalfunctions}
        dashboardAverageTime={dashboardAverageTime}
        isLoadingPanels={isLoadingPanels}
      />
    </>
  );
};
