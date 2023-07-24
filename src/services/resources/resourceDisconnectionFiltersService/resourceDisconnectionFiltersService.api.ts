import { axios } from 'api/axios';
import { ResourceDisconnectingFilterResponse } from 'api/types';

export const fetchResourceDisconnectionFilters =
  (): Promise<ResourceDisconnectingFilterResponse> =>
    axios.get('ResourceDisconnecting/Filters');
