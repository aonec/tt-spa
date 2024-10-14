import { useUnit } from 'effector-react';
import { CurrentAnalyticsPage } from './CurrentAnalyticsPage';
import { dashboardSummaryQuery } from './currentAnalyticsService.api';
import { currentAnalyticsService } from './currentAnalyticsService.models';

const {
  inputs,
  outputs,
  gates: { CurrentAnalyticsGate },
} = currentAnalyticsService;

export const CurrentAnalyticsContainer = () => {
  const {
    dashboardSummary,
    isLoading,
    currentDashboardType,
    setCurrentDashboardType,
  } = useUnit({
    dashboardSummary: dashboardSummaryQuery.$data,
    isLoading: dashboardSummaryQuery.$pending,
    currentDashboardType: outputs.$currentDashboardType,
    setCurrentDashboardType: inputs.setCurrentDashboardType,
  });

  return (
    <>
      <CurrentAnalyticsGate />
      <CurrentAnalyticsPage
        dashboardSummary={dashboardSummary}
        isLoading={isLoading}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
      />
    </>
  );
};
