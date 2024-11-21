import {
  EManagingFirmTaskFilterType,
  ETemperatureNormativeDeviationType,
  ManagingFirmTaskType,
  ResourceType,
} from 'api/types';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export function getTasksFilters({
  dashboardType,
  resourceType,
  malfunctionType,
  deviationType,
}: {
  dashboardType: DashboardDataType;
  resourceType?: ResourceType;
  malfunctionType?: ManagingFirmTaskType;
  deviationType?: ETemperatureNormativeDeviationType;
}) {
  if (
    dashboardType === DashboardDataType.PipeRupturesCount ||
    dashboardType === DashboardDataType.ResourceDisconnectsCount
  ) {
    const taskType =
      dashboardType === DashboardDataType.PipeRupturesCount
        ? EManagingFirmTaskFilterType.PipeRupture
        : EManagingFirmTaskFilterType.ResourceDisconnecting;

    return {
      resource: resourceType,
      taskType: taskType,
    };
  }

  if (
    malfunctionType &&
    (dashboardType === DashboardDataType.MalfunctionsCount ||
      dashboardType === DashboardDataType.AverageCompletionTime)
  ) {
    const taskTypes: { [key: string]: string } = {
      [ManagingFirmTaskType.CalculatorMalfunction]:
        EManagingFirmTaskFilterType.CalculatorMalfunctionAny,
      [ManagingFirmTaskType.HousingDeviceMalfunction]:
        EManagingFirmTaskFilterType.HousingDeviceMalfunctionAny,
      [ManagingFirmTaskType.CalculatorLackOfConnection]:
        EManagingFirmTaskFilterType.CalculatorLackOfConnection,
      [ManagingFirmTaskType.MeasurementErrorCommercial]:
        EManagingFirmTaskFilterType.MeasurementErrorAny,
    };

    return {
      taskType: taskTypes[malfunctionType],
    };
  }

  if (dashboardType === DashboardDataType.TasksCount) {
    return {
      taskType: EManagingFirmTaskFilterType.TemperatureNormativeDeviation,
    };
  }
}
