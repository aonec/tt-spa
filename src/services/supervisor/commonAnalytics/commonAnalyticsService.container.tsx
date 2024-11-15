import { useUnit } from 'effector-react';
import { CommonAnalyticsPage } from './CommonAnalyticsPage';
import { commonAnalyticsService } from './commonAnalyticsService.models';
import { commonSummaryQuery } from './commonAnalyticsService.api';

const { inputs, outputs, gates } = commonAnalyticsService;

const { CommonAnalyticsGate } = gates;

export const CommonAnalyticsContainer = () => {
  const {
    setDashboardFilters,
    dashboardFilters,
    resetDashboardFilters,
    dashboardSummary,
    currentDashboardType,
    setCurrentDashboardType,
    isLoading,
    isLoadingSummary,
    analyticsData,
  } = useUnit({
    setDashboardFilters: inputs.setDashboardFilters,
    dashboardFilters: outputs.$dashboardFilters,
    resetDashboardFilters: inputs.resetDashboardFilters,
    dashboardSummary: commonSummaryQuery.$data,
    currentDashboardType: outputs.$currentDashboardType,
    setCurrentDashboardType: inputs.setCurrentDashboardType,
    isLoading: outputs.$isLoading,
    isLoadingSummary: commonSummaryQuery.$pending,
    analyticsData: outputs.$analyticsData,
  });

  return (
    <>
      <CommonAnalyticsGate />
      <CommonAnalyticsPage
        setDashboardFilters={setDashboardFilters}
        dashboardFilters={dashboardFilters}
        resetDashboardFilters={resetDashboardFilters}
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
        isLoading={isLoading}
        isLoadingSummary={isLoadingSummary}
        analyticsData={analyticsData}
      />
    </>
  );
};
