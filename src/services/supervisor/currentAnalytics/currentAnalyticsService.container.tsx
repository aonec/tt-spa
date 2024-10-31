import { useUnit } from 'effector-react';
import { CurrentAnalyticsPage } from './CurrentAnalyticsPage';
import {
  dashboardAverageTimeQuery,
  dashboardMalfunctionsQuery,
  dashboardPiperuptersQuery,
  dashboardResourceDisconnectionQuery,
  dashboardServiceQualityQuery,
  dashboardSummaryQuery,
  managementFirmsWithBuildingsQuery,
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
    dashboardServiceQuality,
    managementFirms,
  } = useUnit({
    dashboardSummary: dashboardSummaryQuery.$data,
    managementFirms: managementFirmsWithBuildingsQuery.$data,
    isLoadingSummary: dashboardSummaryQuery.$pending,
    currentDashboardType: outputs.$currentDashboardType,
    setCurrentDashboardType: inputs.setCurrentDashboardType,
    dashboardPiperuptersList: dashboardPiperuptersQuery.$data,
    dashboardResourceDisconnection: dashboardResourceDisconnectionQuery.$data,
    dashboardMalfunctions: dashboardMalfunctionsQuery.$data,
    dashboardAverageTime: dashboardAverageTimeQuery.$data,
    dashboardServiceQuality: dashboardServiceQualityQuery.$data,
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
        dashboardServiceQuality={dashboardServiceQuality}
        isLoadingPanels={isLoadingPanels}
        managementFirms={managementFirms}
      />
    </>
  );
};
