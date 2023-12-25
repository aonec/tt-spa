import { sample } from 'effector';
import {
  createJsonMutation,
  declareParams,
  applyBarrier,
} from '@farfetched/core';
import { authBarrier } from '../tokensService/tokensService.relations';
import { tokensService } from '../tokensService';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { MutationFactoryParams } from './types';
import { requestFailed, setIsOnline } from './model';

export function createMutationWithAuth<
  Params extends object | void,
  Data,
  TransformedData,
  Body,
>({
  url,
  response,
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
        source: developmentSettingsService.outputs.$devUrl,
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
        response.mapData({ params, result: result.successResponse }),
    },
    concurrency: {
      abort,
    },
  });

  applyBarrier(mutation, { barrier: authBarrier });

  setIsOnline();

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
