import { sample } from 'effector';
import {
  createJsonMutation,
  declareParams,
  applyBarrier,
} from '@farfetched/core';
import { authBarrier } from '../tokensService/tokensService.relations';
import { tokensService } from '../tokensService';
import { MutationFactoryParams, SuccessResponse } from './types';
import { requestFailed, setIsOnline } from './model';
import { currentOrganizationService } from 'services/currentOrganizationService';

export function createMutation<
  Params extends object | void,
  Data,
  TransformedData,
  Body,
>({
  url,
  response = {
    contract: {
      isData: (res): res is SuccessResponse<Data> => Boolean(res),
      getErrorMessages: () => ['Invalid data'],
    },
  },
  abort,
  method,
  body,
}: MutationFactoryParams<Params, Data, TransformedData, Body>) {
  const mutation = createJsonMutation({
    params: declareParams<Params>(),
    request: {
      method,
      body: body && body,
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
      abort,
    },
  });

  applyBarrier(mutation, { barrier: authBarrier });

  sample({
    clock: mutation.finished.success,
    target: setIsOnline,
  });

  sample({
    clock: mutation.finished.failure,
    fn: ({ error, params }) => ({
      error,
      method,
      url: typeof url === 'function' ? url(params) : url,
    }),
    target: requestFailed,
  });

  return mutation;
}
