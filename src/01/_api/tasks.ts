import { pushStageFx } from '01/features/tasks/pushingStage/models';
import axios from 'axios';
import {
  EManagingFirmTaskFilterType,
  EOrderByRule,
  ETaskClosingStatus,
  ETaskTargetType,
  StageListResponse,
  StagePushRequest,
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
  ApplicationCompetenceType?: any | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export const getTask = (id: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${id}`);

export const getNextStages = async (
  taskId: number
): Promise<StageListResponse[] | null> => {
  const res: any = await axios.get(`Tasks/${taskId}/NextStages`);

  return res.items;
};

export const pushStages = ({
  taskId,
  payload,
}: {
  taskId: number;
  payload: StagePushRequest;
}): Promise<void> => axios.post(`Tasks/${taskId}/PushStage`, payload);
