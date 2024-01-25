import { applyBarrier, createJsonQuery, declareParams } from '@farfetched/core';
import { sample } from 'effector';
import { tokensService } from '../tokensService';
import { authBarrier } from '../tokensService/tokensService.relations';
import { QueryFactoryParams } from './types';
import { requestFailed, setIsOnline } from './model';
import { currentOrganizationService } from 'services/currentOrganizationService';

const method: 'GET' = 'GET';

export function createQueryWithAuth<
  Params extends object | void,
  Data,
  TransformedData = Data,
>({
  url,
  response,
  errorConverter,
}: QueryFactoryParams<Params, Data, TransformedData>) {
  const query = createJsonQuery({
    params: declareParams<Params>(),
    request: {
      method,
      query: (params) =>
        params ? new URLSearchParams(Object.entries(params)).toString() : '',
      url: {
        source: currentOrganizationService.outputs.$devUrl,
        fn: (params, baseUrl) =>
          new URL(
            typeof url === 'function' ? url(params) : url,
            baseUrl,
          ).toString(),
      },
      headers: {
        source: tokensService.outputs.$token,
        fn: (_, token) => ({
          Authorization: `Bearer ${token}`,
          'x-user-path': window.location.pathname || 'none',
        }),
      },
    },
    response: {
      ...response,
      mapData: ({ params, result }) =>
        response.mapData
          ? response.mapData({ params, result: result.successResponse })
          : result.successResponse,
    },
    concurrency: {
      strategy: 'TAKE_EVERY',
    },
  });

  applyBarrier(query, { barrier: authBarrier });

  sample({
    clock: query.finished.success,
    target: setIsOnline,
  });

  sample({
    clock: query.finished.failure,
    fn: ({ error, params }) => ({
      errorConverter,
      error,
      method,
      url: typeof url === 'function' ? url(params) : url,
    }),
    target: requestFailed,
  });

  return query;
}
