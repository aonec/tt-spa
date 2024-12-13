import {
  DashboardBaseTaskItemModel,
  ManagingFirmTaskType,
  ResourceType,
} from 'api/types';

export type Props = {
  title: string | null;
  data: DashboardBaseTaskItemModel;
  hideExpired?: boolean;
  resourceType?: ResourceType;
  malfunctionType?: ManagingFirmTaskType;
};
