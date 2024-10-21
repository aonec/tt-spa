import { FC, useMemo } from 'react';
import { DashboardPanelWrapper, Wrapper } from './CurrentAnalyticsPage.styled';
import { Props } from './CurrentAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from './AnalyticsSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { InfoOptionsPanels } from './InfoOptionsPanels';
import { splitArrayForDashboard } from './CurrentAnalyticsPage.utils';
import { DashboardPanel } from './DashboardPanel';
import { DashboardDataType } from '../currentAnalyticsService.types';
import {
  DashboardTaskMalfunctionResponse,
  DashboardTaskResourceResponse,
} from 'api/types';

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
  const dashboardData = useMemo(() => {
    const dataMap = {
      [DashboardDataType.PipeRupturesCount]: dashboardPiperuptersList,
      [DashboardDataType.ResourceDisconnectsCount]:
        dashboardResourceDisconnection,
      [DashboardDataType.MalfunctionsCount]: dashboardMalfunctions,
      [DashboardDataType.AverageCompletionTime]: null,
      [DashboardDataType.TasksCount]: null,
    };

    const dataList = dataMap[currentDashboardType];

    return (
      dataList &&
      splitArrayForDashboard<
        DashboardTaskMalfunctionResponse | DashboardTaskResourceResponse
      >(dataList)
    );
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
          {dashboardData?.panels?.map((data) => (
            <DashboardPanel data={data} />
          ))}
          {dashboardData?.others && (
            <DashboardPanel otherData={dashboardData.others} />
          )}
        </DashboardPanelWrapper>
      </WithLoader>
    </Wrapper>
  );
};
