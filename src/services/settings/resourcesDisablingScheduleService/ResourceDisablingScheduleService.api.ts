import { axios } from 'api/axios';
import { ResourceDisconnectingResponsePagedList } from 'api/types';
import { DisablingResourcesQueryParams } from './ResourceDisablingScheduleService.types';

export const fetchDisablingResources = (
  params: DisablingResourcesQueryParams,
): Promise<ResourceDisconnectingResponsePagedList> => {
  return axios.get('ResourceDisconnecting', { params });
};
