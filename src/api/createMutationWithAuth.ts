import { createEvent, EventCallable, sample } from 'effector';
import { message } from 'antd';
import {
  createJsonMutation,
  declareParams,
  isHttpErrorCode,
  applyBarrier,
  Contract,
} from '@farfetched/core';
import { authBarrier } from './tokensService/tokensService.relations';
import { tokensService } from './tokensService';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { forbiddenList } from 'utils/403handling';

const forbiddenUserError = createEvent();
forbiddenUserError.watch(() => {
  message.error(
    'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
  );
});

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
}: {
  url: ((params: Params) => string) | string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Body;
  response: {
    contract: Contract<unknown, { successResponse: Data | null }>;
    mapData: (payload: {
      result: Data | null;
      params: Params;
    }) => TransformedData;
  };
  abort?: EventCallable<void>;
}) {
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

  sample({
    clock: mutation.finished.failure,
    filter: isHttpErrorCode(401),
    target: tokensService.inputs.tokenExpired,
  });

  sample({
    clock: mutation.finished.failure,
    filter: ({ error, params }) => {
      return (
        forbiddenList.some(
          (forbiddenUrl) =>
            forbiddenUrl.methods.includes('GET') &&
            forbiddenUrl.regExp.test(
              typeof url === 'function' ? url(params) : url,
            ),
        ) && isHttpErrorCode(403)({ error })
      );
    },
    target: forbiddenUserError,
  });

  return mutation;
}
