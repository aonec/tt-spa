import {
  EManagingFirmTaskFilterType,
  ManagingFirmTaskType,
  ResourceType,
} from 'api/types';
import { DashboardDataType } from 'services/supervisor/currentAnalytics/currentAnalyticsService.types';

export function getTasksFilters({
  dashboardType,
  resourceType,
  malfunctionType,
}: {
  dashboardType: DashboardDataType;
  resourceType?: ResourceType;
  malfunctionType?: ManagingFirmTaskType;
}) {
  const isPipeRuptures = dashboardType === DashboardDataType.PipeRupturesCount;
  const isResourceDisconnects =
    dashboardType === DashboardDataType.ResourceDisconnectsCount;
  const isMalfunctions = dashboardType === DashboardDataType.MalfunctionsCount;
  const isAverageTime =
    dashboardType === DashboardDataType.AverageCompletionTime;

  if (isPipeRuptures) {
    return {
      resource: resourceType,
      taskType: EManagingFirmTaskFilterType.PipeRupture,
    };
  }

  if (isResourceDisconnects) {
    return {
      resource: resourceType,
      taskType: EManagingFirmTaskFilterType.ResourceDisconnecting,
    };
  }

  if (malfunctionType && (isMalfunctions || isAverageTime)) {
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
