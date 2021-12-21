import axios from 'axios';
import {
  ECompetenceType,
  EManagingFirmTaskFilterType,
  EOrderByRule,
  ETaskClosingStatus,
  ETaskTargetType,
  TaskGroupingFilter,
  TaskResponse,
} from 'myApi';

export interface GetTasksParams {
  SearchingFilter?: string | null;
  TargetType?: ETaskTargetType | null;
  TaskId?: number | null;
  TaskType?: EManagingFirmTaskFilterType | null;
  GroupType?: TaskGroupingFilter | null;
  DeviceId?: number | null;
  HousingStockId?: number | null;
  ApartmentId?: number | null;
  HousingStockAddress?: string | null;
  HasChanged?: boolean | null;
  PipeNodeId?: number | null;
  ClosingStatuses?: ETaskClosingStatus[] | null;
  ApplicationCompetenceType?: ECompetenceType | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export const getTask = (id: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${id}`);
