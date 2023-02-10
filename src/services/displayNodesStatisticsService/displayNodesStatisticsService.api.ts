import { axios } from '01/axios';
import { ArchivesDataModel, TaskResponse, TaskStatisticsResponse } from 'myApi';
import {
  TasksStatisticPayload,
  FetchArchiveReadingsPayload,
} from './displayNodesStatisticsService.types';

export const requestNodeReadings = async (
  params: FetchArchiveReadingsPayload,
): Promise<ArchivesDataModel> =>
  axios.get(`Nodes/${params.nodeId}/Statistics`, { params });

export const requestTaskStatistics = async ({
  nodeId,
  ...params
}: TasksStatisticPayload): Promise<TaskStatisticsResponse> => {
  const res: TaskStatisticsResponse = await axios.get(
    `Nodes/${nodeId}/TaskStatistics`,
    { params },
  );

  Promise.all(
    (res?.tasks || [])
      .map((tasksByDate) => tasksByDate.value)
      .flat()
      .reduce((acc, task) => {
        if (!task?.id) {
          return acc;
        }
        return [...acc, task.id];
      }, [] as number[])
      .map(getTaskbyId),
  );
  return res;
};

const getTaskbyId = async (taskId: number): Promise<TaskResponse | null> => {
  try {
    return await axios.get(`Tasks/${taskId}`);
  } catch {
    return null;
  }
};
