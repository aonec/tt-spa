import { FC, useMemo } from 'react';
import { UnitWrapper, Wrapper } from './InfoOptionsPanels.styled';
import { Props } from './InfoOptionsPanels.types';
import { OptionPanelButton } from 'ui-kit/shared/OptionPanelButton';
import { DashboardDataType } from '../../currentAnalyticsService.types';
import { Skeleton } from 'antd';

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
        type: DashboardDataType.PipeRupturesCount,
      },
      {
        title: 'Отключения',
        value: dashboardSummary?.dashboardResourceDisconnectsCount,
        type: DashboardDataType.ResourceDisconnectsCount,
      },
      {
        title: 'Неисправности',
        value: dashboardSummary?.dashboardMalfunctionsCount,
        type: DashboardDataType.MalfunctionsCount,
      },
      {
        title: 'Время на задачу',
        value: dashboardSummary?.dashboardAverageCompletionTime,
        unit: 'мин',
        type: DashboardDataType.AverageCompletionTime,
      },
      {
        title: 'Качество услуг',
        value: dashboardSummary?.dashboardServiceQualityCount,
        unit: 'задач',
        type: DashboardDataType.TasksCount,
      },
    ];

    return options.map((option) => ({
      ...option,
      active: option.type === currentDashboardType,
    }));
  }, [
    currentDashboardType,
    dashboardSummary?.dashboardAverageCompletionTime,
    dashboardSummary?.dashboardMalfunctionsCount,
    dashboardSummary?.dashboardPipeRupturesCount,
    dashboardSummary?.dashboardResourceDisconnectsCount,
    dashboardSummary?.dashboardServiceQualityCount,
  ]);

  return (
    <Wrapper>
      {optionsList.map(({ value, title, unit, active, type }) => (
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
            <>
              {String(value).replace('.', ',')}{' '}
              <UnitWrapper>{unit}</UnitWrapper>
            </>
          )}
        </OptionPanelButton>
      ))}
    </Wrapper>
  );
};
