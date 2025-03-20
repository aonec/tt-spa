import { FC, useMemo } from 'react';
import {
  Percent,
  UnitWrapper,
  ValueWrapper,
  Wrapper,
} from './InfoOptionsPanels.styled';
import { Props } from './InfoOptionsPanels.types';
import { OptionPanelButton } from 'ui-kit/shared/OptionPanelButton';
import { DashboardDataType } from '../../currentAnalyticsService.types';
import { Skeleton } from 'antd';
import { formatCompletionTime } from '../DashboardPanel/utils';

export const InfoOptionsPanels: FC<Props> = ({
  dashboardSummary,
  currentDashboardType,
  setCurrentDashboardType,
  isLoading,
}) => {
  const optionsList = useMemo(() => {
    const options = [
      {
        title: 'Порывы',
        value: dashboardSummary?.dashboardPipeRupturesCount,
        percent: dashboardSummary?.dashboardPipeRupturesPercentage,
        type: DashboardDataType.PipeRupturesCount,
      },
      {
        title: 'Отключения',
        value: dashboardSummary?.dashboardResourceDisconnectsCount,
        percent: dashboardSummary?.dashboardResourceDisconnectsPercentage,
        type: DashboardDataType.ResourceDisconnectsCount,
      },
      {
        title: 'Неисправности',
        value: dashboardSummary?.dashboardMalfunctionsCount,
        percent: dashboardSummary?.dashboardMalfunctionsPercentage,
        type: DashboardDataType.MalfunctionsCount,
      },
      // {
      //   title: 'Время на задачу',
      //   value: dashboardSummary?.dashboardAverageCompletionTime,
      //   percent: dashboardSummary?.dashboardAverageCompletionTimePercentage,
      //   unit: 'мин',
      //   type: DashboardDataType.AverageCompletionTime,
      // },
      {
        title: 'Качество услуг',
        value: dashboardSummary?.dashboardServiceQualityCount,
        percent: dashboardSummary?.dashboardServiceQualityPercentage,
        unit: 'задач',
        type: DashboardDataType.TasksCount,
      },
    ];

    return options.map((option) => ({
      ...option,
      active: option.type === currentDashboardType,
    }));
  }, [currentDashboardType, dashboardSummary]);

  return (
    <Wrapper>
      {optionsList.map(({ value, title, unit, active, type, percent }) => {
        const isPositive = (percent || 0) > 0;

        return (
          <OptionPanelButton
            title={title}
            key={type}
            isActive={active}
            onClick={() => setCurrentDashboardType(type)}
          >
            {isLoading && (
              <Skeleton.Input
                active
                size="small"
                style={{ transform: 'translateY(-6px)' }}
              />
            )}
            {!isLoading && value && (
              <ValueWrapper>
                {type === DashboardDataType.AverageCompletionTime
                  ? formatCompletionTime(value)
                  : value}{' '}
                <UnitWrapper>{unit}</UnitWrapper>{' '}
                {Boolean(percent) && (
                  <Percent isPositive={isPositive}>
                    {isPositive && '+'}
                    {percent}%
                  </Percent>
                )}
              </ValueWrapper>
            )}
          </OptionPanelButton>
        );
      })}
    </Wrapper>
  );
};
