import { useUnit } from 'effector-react';
import { CurrentAnalyticsPage } from './CurrentAnalyticsPage';
import { dashboardDataQuery } from './currentAnalyticsService.api';
import { currentAnalyticsService } from './currentAnalyticsService.models';

const {
  gates: { CurrentAnalyticsGate },
} = currentAnalyticsService;

export const CurrentAnalyticsContainer = () => {
  const { dashboardData, isLoading } = useUnit({
    dashboardData: dashboardDataQuery.$data,
    isLoading: dashboardDataQuery.$pending,
  });

  return (
    <>
      <CurrentAnalyticsGate />
      <CurrentAnalyticsPage
        dashboardData={dashboardData}
        isLoading={isLoading}
      />
    </>
  );
};
