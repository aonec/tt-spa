import { FC, useState } from 'react';
import { DashboardPanelWrapper, Wrapper } from './CurrentAnalyticsPage.styled';
import { Props } from './CurrentAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from './AnalyticsSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { InfoOptionsPanels } from './InfoOptionsPanels';
import { DashboardDataType } from '../currentAnalyticsService.types';
import { DashboardPanel } from './DashboardPanel';

export const CurrentAnalyticsPage: FC<Props> = ({
  isLoading,
  dashboardData,
}) => {
  const [currentDashboardType, setCurrentDashboardType] = useState(
    DashboardDataType.PipeRupturesCount,
  );

  return (
    <Wrapper>
      <PageHeader title="Текущая ситуация" contextMenu={{}} />
      <AnalyticsSearch />
      <InfoOptionsPanels
        dashboardData={dashboardData}
        currentDashboardType={currentDashboardType}
        setCurrentDashboardType={setCurrentDashboardType}
      />
      <WithLoader isLoading={isLoading}>
        <DashboardPanelWrapper>
          {dashboardData?.dashboardPanels?.map((data) => (
            <DashboardPanel data={data} />
          ))}
          {dashboardData?.dashboardOthers && (
            <DashboardPanel otherData={dashboardData.dashboardOthers} />
          )}
        </DashboardPanelWrapper>
      </WithLoader>
    </Wrapper>
  );
};
