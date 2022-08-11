import {
  EManagingFirmTaskFilterType,
  EOrderByRule,
  EResourceType,
  ETaskClosingStatus,
  ETaskEngineeringElement,
  ETaskTargetType,
  EStageTimeStatus,
  TaskGroupingFilter,
} from 'myApi';

export type ExportTasksListRequestPayload = {
  TargetType?: ETaskTargetType;
  TaskId?: string;
  TaskType?: EManagingFirmTaskFilterType | null;
  GroupType?: TaskGroupingFilter;
  HouseManagementId?: string;
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
};
