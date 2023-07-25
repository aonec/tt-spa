import { axios } from 'api/axios';
import { ResourceDisconnectingResponsePagedList } from 'api/types';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';

export const fetchDisablingResources = (
  params: DisablingResourcesProps | unknown,
): Promise<ResourceDisconnectingResponsePagedList> =>
  axios.get('ResourceDisconnecting', { params });
