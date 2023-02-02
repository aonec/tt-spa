import { axios } from '01/axios';
import { ArchivesDataModel } from 'myApi';
import { FetchArchiveReadingsPayload } from './displayNodesStatisticsService.types';

export const requestNodeReadings = async (
  params: FetchArchiveReadingsPayload,
): Promise<ArchivesDataModel> =>
  axios.get(`Nodes/${params.nodeId}/Statistics`, { params });
