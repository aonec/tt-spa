import { axios } from 'api/axios';
import { ArchivesDataModel, TaskStatisticsResponse } from 'myApi';
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
}: TasksStatisticPayload): Promise<TaskStatisticsResponse> =>
  axios.get(`Nodes/${nodeId}/TaskStatistics`, { params });
