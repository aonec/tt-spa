import { axios } from 'api/axios';
import { ResourceDisconnectingFilterResponse } from 'myApi';

export const fetchResourceDisconnectionFilters =
  (): Promise<ResourceDisconnectingFilterResponse> =>
    axios.get('ResourceDisconnecting/Filters');
