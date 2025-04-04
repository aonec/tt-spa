import { useUnit } from 'effector-react';
import { CommonAnalyticsPage } from './CommonAnalyticsPage';
import { commonAnalyticsService } from './commonAnalyticsService.models';
import {
  commonSummaryQuery,
  dashboardOrganizationsQuery,
} from './commonAnalyticsService.api';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = commonAnalyticsService;

const { CommonAnalyticsGate } = gates;

const {
  gates: { ExistingCitiesGate },
} = addressSearchService;

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
    organizations,
    dateRangeType,
    setDateRangeType,
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
    organizations: dashboardOrganizationsQuery.$data,
    dateRangeType: outputs.$dateRangeType,
    setDateRangeType: inputs.setDateRangeType,
  });

  return (
    <>
      <ExistingCitiesGate />
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
        organizations={organizations}
        dateRangeType={dateRangeType}
        setDateRangeType={setDateRangeType}
      />
    </>
  );
};
