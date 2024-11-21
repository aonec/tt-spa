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
    dashboardType === DashboardDataType.MalfunctionsCount ||
    dashboardType === DashboardDataType.AverageCompletionTime
  ) {
    return {
      taskType: malfunctionType,
    };
  }
}
