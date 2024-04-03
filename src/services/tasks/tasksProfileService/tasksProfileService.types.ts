import {
  EManagingFirmTaskFilterType,
  EOrderByRule,
  EResourceType,
  ETaskClosingStatus,
  ETaskEngineeringElement,
  ETaskTargetType,
  EStageTimeStatus,
  TaskGroupingFilter,
  TaskPaginationOrderRule,
} from 'api/types';

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
  TimeStatus?: EStageTimeStatus;
  PerpetratorId?: number;
  Resource?: EResourceType;
  EngineeringElement?: ETaskEngineeringElement;
  City?: string;
  Street?: string;
  HousingStockNumber?: string;
  Corpus?: string;
  ApartmentNumber?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  OrderRule?: TaskPaginationOrderRule;
};

export type FiltersGatePayload = {
  apartmentId: string | null;
  housingStockId: string | null;
  pipeNodeId: string | null;
  deviceId: string | null;
};

export const TimeStatusesLookUp: { [key in EStageTimeStatus]: string } = {
  [EStageTimeStatus.Normal]: 'Нормально',
  [EStageTimeStatus.RunningOut]: 'Истекает',
  [EStageTimeStatus.Expired]: 'Просроченно',
};

export type TasksSummaryData = {
  runningOutTasksCount: number | null;
  expiredTasksCount: number | null;
  executingTasksCount: number | null;
};
