import { useUnit } from 'effector-react';
import { CurrentAnalyticsPage } from './CurrentAnalyticsPage';
import {
  dashboardAverageTimeQuery,
  dashboardMalfunctionsQuery,
  dashboardPiperuptersQuery,
  dashboardResourceDisconnectionQuery,
  dashboardServiceQualityQuery,
  dashboardSummaryQuery,
} from './currentAnalyticsService.api';
import { currentAnalyticsService } from './currentAnalyticsService.models';
import { getItemArray } from './currentAnalyticsService.utils';

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
    dashboardFilters,
    setDashboardFilters,
    resetDashboardFilters,
  } = useUnit({
    dashboardSummary: dashboardSummaryQuery.$data,
    isLoadingSummary: dashboardSummaryQuery.$pending,
    currentDashboardType: outputs.$currentDashboardType,
    setCurrentDashboardType: inputs.setCurrentDashboardType,
    dashboardPiperuptersList: dashboardPiperuptersQuery.$data,
    dashboardResourceDisconnection: dashboardResourceDisconnectionQuery.$data,
    dashboardMalfunctions: dashboardMalfunctionsQuery.$data,
    dashboardAverageTime: dashboardAverageTimeQuery.$data,
    dashboardServiceQuality: dashboardServiceQualityQuery.$data,
    isLoadingPanels: outputs.$isLoading,
    dashboardFilters: outputs.$dashboardFilters,
    setDashboardFilters: inputs.setDashboardFilters,
    resetDashboardFilters: inputs.resetDashboardFilters,
  });

  return (
    <>
      <CurrentAnalyticsGate />
      <CurrentAnalyticsPage
        dashboardSummary={dashboardSummary}
        isLoading={isLoadingSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
        dashboardPiperuptersList={getItemArray(dashboardPiperuptersList)}
        dashboardResourceDisconnection={getItemArray(
          dashboardResourceDisconnection,
        )}
        dashboardMalfunctions={getItemArray(dashboardMalfunctions)}
        dashboardAverageTime={getItemArray(dashboardAverageTime)}
        dashboardServiceQuality={getItemArray(dashboardServiceQuality)}
        isLoadingPanels={isLoadingPanels}
        dashboardFilters={dashboardFilters}
        setDashboardFilters={setDashboardFilters}
        resetDashboardFilters={resetDashboardFilters}
      />
    </>
  );
};
