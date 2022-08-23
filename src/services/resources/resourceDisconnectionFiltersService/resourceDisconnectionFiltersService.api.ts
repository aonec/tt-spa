import { axios } from '01/axios';
import { ResourceDisconnectingFilterResponse } from 'myApi';

export const fetchResourceDisconnectionFilters = (): Promise<ResourceDisconnectingFilterResponse> =>
  axios.get('ResourceDisconnecting/Filters');
