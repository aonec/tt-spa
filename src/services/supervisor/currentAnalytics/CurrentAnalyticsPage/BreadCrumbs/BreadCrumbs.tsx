import { FC, useMemo } from 'react';
import { BreadCrumb, Wrapper } from './BreadCrumbs.styled';
import { Props } from './BreadCrumbs.types';
import { DashboardQueryParams } from '../../currentAnalyticsService.types';

export const BreadCrumbs: FC<Props> = ({
  dashboardSummary,
  setDashboardFilters,
}) => {
  const breadCrumbsList = useMemo((): {
    value: DashboardQueryParams;
    title: string | null;
  }[] => {
    if (!dashboardSummary) return [];

    return [
      {
        value: { ManagementFirmId: null, City: null },
        title: `Все города`,
      },
      {
        value: {
          ManagementFirmId: null,
          City: dashboardSummary.breadCrumbs?.city || '',
        },
        title: dashboardSummary.breadCrumbs?.city || null,
      },
      {
        value: {},
        title: dashboardSummary.breadCrumbs?.managingFirmName || null,
      },
    ].filter(({ title }) => Boolean(title));
  }, [dashboardSummary]);

  if (!dashboardSummary) return null;

  return (
    <Wrapper>
      {breadCrumbsList.map((elem, index) => {
        const isLast = index === breadCrumbsList.length - 1;

        return (
          <>
            <BreadCrumb
              isLast={isLast}
              onClick={() => !isLast && setDashboardFilters(elem.value)}
            >
              {elem.title}
            </BreadCrumb>
            {!isLast && ` / `}
          </>
        );
      })}
    </Wrapper>
  );
};
