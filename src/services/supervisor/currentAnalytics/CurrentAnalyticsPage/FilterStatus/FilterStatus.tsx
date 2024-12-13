import { FC, useMemo } from 'react';
import { Close, Wrapper } from './FilterStatus.styled';
import { Props } from './FilterStatus.types';
import { DashboardDataType } from '../../currentAnalyticsService.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { MalfunctionIcon } from '../DashboardPanel/ResourceStatistic/MalfunctionIcon';
import { DiviationTitle } from '../DashboardPanel/ResourceStatistic/ResourceStatistic.styled';
import {
  DeviationTypeDescriptionsLookup,
  DeviationTypeIconLookup,
} from '../DashboardPanel/ResourceStatistic/TaskQualityDetail';
import { X } from 'react-bootstrap-icons';
import { MalfunctionDescription } from 'services/supervisor/commonAnalytics/CommonAnalyticsPage/StatisticItem/DashboardAnalyticsDetail/MalfunctionIcon/MalfunctionIcon.constants';

export const FilterStatus: FC<Props> = ({
  dashboardFilters,
  setDashboardFilters,
  currentDashboardType,
}) => {
  const currentActiveFilter = useMemo(() => {
    const filters = [
      {
        dashboardTypes: [
          DashboardDataType.PipeRupturesCount,
          DashboardDataType.ResourceDisconnectsCount,
        ],
        title: 'Ресурс',
        value: dashboardFilters.ResourceType && (
          <ResourceInfo resource={dashboardFilters.ResourceType} />
        ),
      },
      {
        dashboardTypes: [
          DashboardDataType.MalfunctionsCount,
          DashboardDataType.AverageCompletionTime,
        ],
        title: 'Тип неисправности',
        value: dashboardFilters.MalfunctionType && (
          <>
            <MalfunctionIcon type={dashboardFilters.MalfunctionType} />{' '}
            {MalfunctionDescription[dashboardFilters.MalfunctionType] ||
              dashboardFilters.MalfunctionType}
          </>
        ),
      },
      {
        dashboardTypes: [DashboardDataType.TasksCount],
        title: 'Тип отклонения',
        value: dashboardFilters.DeviationType && (
          <DiviationTitle>
            {DeviationTypeIconLookup[dashboardFilters.DeviationType]}
            {DeviationTypeDescriptionsLookup[dashboardFilters.DeviationType]}
          </DiviationTitle>
        ),
      },
    ];

    return (
      filters.find((elem) =>
        elem.dashboardTypes.includes(currentDashboardType),
      ) || null
    );
  }, [dashboardFilters, currentDashboardType]);

  if (!currentActiveFilter?.value) return null;

  return (
    <Wrapper>
      {currentActiveFilter.value}{' '}
      <Close
        onClick={() =>
          setDashboardFilters({
            ResourceType: null,
            DeviationType: null,
            MalfunctionType: null,
          })
        }
      >
        <X />
      </Close>
    </Wrapper>
  );
};
