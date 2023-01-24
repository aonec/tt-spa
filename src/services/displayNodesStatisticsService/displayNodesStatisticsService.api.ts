import { axios } from '01/axios';
import moment from 'moment';
import { ArchivesDataModel, TaskStatisticsResponse } from 'myApi';
import {
  DateRange,
  FetchArchiveReadingsPayload,
} from './displayNodesStatisticsService.types';

export const requestNodeReadings = async (
  params: FetchArchiveReadingsPayload
): Promise<ArchivesDataModel> =>
  axios.get(`Nodes/${params.nodeId}/Statistics`, { params });

export const requestTaskStatistics = (
  params: DateRange
): Promise<TaskStatisticsResponse> =>
  axios.get('Nodes/1289/TaskStatistics', { params });
