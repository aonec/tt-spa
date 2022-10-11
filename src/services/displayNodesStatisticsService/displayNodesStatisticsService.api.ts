import { axios } from '01/axios';
import { ReadingsInterface } from '01/_pages/Graph/components/GraphView/GraphView.types';
import { QueryInterface } from './displayNodesStatisticsService.types';

export const requestNodeReadings = async (
  params: QueryInterface
): Promise<ReadingsInterface> =>
  axios.get<any, ReadingsInterface>('Reports/Archives', { params });
