import { FC, useMemo } from 'react';
import { UnitWrapper, Wrapper } from './InfoOptionsPanels.styled';
import { Props } from './InfoOptionsPanels.types';
import { OptionPanelButton } from 'ui-kit/shared/OptionPanelButton';
import { DashboardDataType } from '../../currentAnalyticsService.types';

export const InfoOptionsPanels: FC<Props> = ({
  dashboardData,
  currentDashboardType,
  setCurrentDashboardType,
}) => {
  const optionsList = useMemo(() => {
    const options = [
      {
        title: 'Порывы',
        value: dashboardData?.dashboardPipeRupturesCount,
        type: DashboardDataType.PipeRupturesCount,
      },
      {
        title: 'Отключения',
        value: dashboardData?.dashboardResourceDisconnectsCount,
        type: DashboardDataType.ResourceDisconnectsCount,
      },
      {
        title: 'Неисправности',
        value: dashboardData?.dashboardMalfunctionsCount,
        type: DashboardDataType.MalfunctionsCount,
      },
      {
        title: 'Время на задачу',
        value: dashboardData?.dashboardAverageCompletionTime,
        unit: 'мин',
        type: DashboardDataType.AverageCompletionTime,
      },
      {
        title: 'Качество услуг',
        value: dashboardData?.dashboardTasksCount,
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
    dashboardData?.dashboardAverageCompletionTime,
    dashboardData?.dashboardMalfunctionsCount,
    dashboardData?.dashboardPipeRupturesCount,
    dashboardData?.dashboardResourceDisconnectsCount,
    dashboardData?.dashboardTasksCount,
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
          {value} <UnitWrapper>{unit}</UnitWrapper>
        </OptionPanelButton>
      ))}
    </Wrapper>
  );
};
