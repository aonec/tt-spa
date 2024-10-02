import { FC } from 'react';
import { Wrapper } from './CurrentAnalyticsPage.styled';
import { Props } from './CurrentAnalyticsPage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { AnalyticsSearch } from './AnalyticsSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { InfoOptionsPanels } from './InfoOptionsPanels';

export const CurrentAnalyticsPage: FC<Props> = ({
  isLoading,
  dashboardData,
}) => {
  return (
    <Wrapper>
      <PageHeader title="Текущая ситуация" contextMenu={{}} />
      <AnalyticsSearch />
      <InfoOptionsPanels />
      <WithLoader isLoading={isLoading}></WithLoader>
    </Wrapper>
  );
};
