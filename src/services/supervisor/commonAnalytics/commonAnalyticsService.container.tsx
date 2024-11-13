import { useUnit } from 'effector-react';
import { CommonAnalyticsPage } from './CommonAnalyticsPage';
import { commonAnalyticsService } from './commonAnalyticsService.models';
import {
  dashboardSummaryQuery,
  managementFirmsWithBuildingsQuery,
} from '../currentAnalytics/currentAnalyticsService.api';
import {
  commonSummaryQuery,
  dashboardPiperuptersQuery,
} from './commonAnalyticsService.api';

const { inputs, outputs, gates } = commonAnalyticsService;

const { CommonAnalyticsGate } = gates;

export const CommonAnalyticsContainer = () => {
  const {
    setDashboardFilters,
    dashboardFilters,
    managementFirms,
    resetDashboardFilters,
    dashboardSummary,
    currentDashboardType,
    setCurrentDashboardType,
    piperuptersStatistics,
  } = useUnit({
    setDashboardFilters: inputs.setDashboardFilters,
    dashboardFilters: outputs.$dashboardFilters,
    managementFirms: managementFirmsWithBuildingsQuery.$data,
    resetDashboardFilters: inputs.resetDashboardFilters,
    dashboardSummary: commonSummaryQuery.$data,
    currentDashboardType: outputs.$currentDashboardType,
    setCurrentDashboardType: inputs.setCurrentDashboardType,
    piperuptersStatistics: dashboardPiperuptersQuery.$data,
  });

  return (
    <>
      <CommonAnalyticsGate />
      <CommonAnalyticsPage
        setDashboardFilters={setDashboardFilters}
        dashboardFilters={dashboardFilters}
        managementFirms={managementFirms}
        resetDashboardFilters={resetDashboardFilters}
        dashboardSummary={dashboardSummary}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
        piperuptersStatistics={piperuptersStatistics}
      />
    </>
  );
};
