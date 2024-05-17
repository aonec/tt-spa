import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { ExportResourceDisconnectingParams } from './exportResourceDisconnectionsService.types';
import queryString from 'query-string';

export const exportResourceDisconnectionsQuery = createQuery<
  ExportResourceDisconnectingParams,
  File
>({
  handler: (params): Promise<File> =>
    axios.get(`ResourceDisconnecting/Export`, {
      params,
      responseType: 'blob',
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});
