import { axios } from '01/axios';
import { ResourceDisconnectingResponsePagedList } from 'myApi';
import { DisablingResourcesProps } from './ResourceDisablingScheduleContainer.types';

export const fetchDisablingResources = (
  params: DisablingResourcesProps | unknown
): Promise<ResourceDisconnectingResponsePagedList> =>
  axios.get('ResourceDisconnecting', { params });
