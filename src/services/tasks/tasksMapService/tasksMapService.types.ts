import {
  EResourceType,
  EStageTimeStatus,
  ETaskEngineeringElement,
  EManagingFirmTaskType,
} from 'myApi';

export type GetHousingStocksWithTasksRequestPayload = {
  EngineeringElement?: ETaskEngineeringElement;
  ResourceTypes?: EResourceType[];
  TimeStatus?: EStageTimeStatus;
  Type?: EManagingFirmTaskType;
  ExecutorId?: number;
};

export type HousingStocksWithTasksFiltrationValues = {
  engineeringElement: ETaskEngineeringElement | null;
  resourceTypes: EResourceType[];
  timeStatus: EStageTimeStatus | null;
  type: EManagingFirmTaskType | null;
  executorId: number | null;
};
