import { axios } from 'api/axios';
import { ResourceDisconnectingFilterResponse } from 'api/myApi';

export const fetchResourceDisconnectionFilters =
  (): Promise<ResourceDisconnectingFilterResponse> =>
    axios.get('ResourceDisconnecting/Filters');
