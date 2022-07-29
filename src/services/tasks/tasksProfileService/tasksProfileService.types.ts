import { EManagingFirmTaskFilterType, EOrderByRule, ETaskClosingStatus, ETaskTargetType, TaskGroupingFilter } from "../../../api/types";

export type GetTasksListRequestPayload = {
  TargetType?: ETaskTargetType;
  TaskId?: string;
  TaskType?: EManagingFirmTaskFilterType | null;
  HouseManagementId?: string;
  GroupType?: TaskGroupingFilter;
  DeviceId?: number;
  HousingStockId?: number;
  ApartmentId?: number;
  HasChanged?: boolean;
  PipeNodeId?: number;
  ClosingStatuses?: ETaskClosingStatus[];
  ApplicationCompetenceId?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
