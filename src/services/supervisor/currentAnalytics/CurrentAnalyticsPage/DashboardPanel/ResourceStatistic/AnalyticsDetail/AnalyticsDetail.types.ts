import {
  DashboardBaseTaskItemModel,
  ETemperatureNormativeDeviationType,
  ManagingFirmTaskType,
  ResourceType,
} from 'api/types';

export type Props = {
  data: DashboardBaseTaskItemModel;
  hideExpired?: boolean;
  resourceType?: ResourceType;
  malfunctionType?: ManagingFirmTaskType;
  deviationType?: ETemperatureNormativeDeviationType;
  title?: string | null;
};
