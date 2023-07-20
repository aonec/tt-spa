import {
  EResourceType,
  EStageTimeStatus,
  ETaskEngineeringElement,
  EManagingFirmTaskType,
} from 'api/myApi';

export type GetHousingStocksWithTasksRequestPayload = {
  EngineeringElement?: ETaskEngineeringElement;
  ResourceTypes?: EResourceType[];
  TimeStatus?: EStageTimeStatus;
  TaskType?: EManagingFirmTaskType;
  ExecutorId?: number;
};

export type HousingStocksWithTasksFiltrationValues = {
  engineeringElement: ETaskEngineeringElement | null;
  resourceTypes: EResourceType[];
  timeStatus: EStageTimeStatus | null;
  type: EManagingFirmTaskType | null;
  executorId: number | null;
};
