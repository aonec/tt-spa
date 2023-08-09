import {
  Contract,
  createJsonQuery,
  declareParams,
  isHttpErrorCode,
  retry,
} from '@farfetched/core';
import { sample, createEvent } from 'effector';
import { tokensService } from './tokensService';
import { refreshMutation } from './tokensService/tokensService.api';
import { forbiddenList } from 'utils/403handling';
import { message } from 'antd';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

const forbiddenUserError = createEvent();
forbiddenUserError.watch(() => {
  message.error(
    'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
  );
});

export function createQueryWithAuth<
  Params extends object | void,
  Data,
  TransformedData,
>({
  url,
  response,
}: {
  url: ((params: Params) => string) | string;
  response: {
    contract: Contract<unknown, { successResponse: Data | null }>;
    mapData: (payload: {
      result: Data | null;
      params: Params;
    }) => TransformedData;
  };
}) {
  const query = createJsonQuery({
    params: declareParams<Params>(),
    request: {
      method: 'GET',
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
  });

  sample({
    source: refreshMutation.$pending,
    clock: query.finished.failure,
    filter: (pending, { error }) => !pending && isHttpErrorCode(401)({ error }),
    target: refreshMutation.start,
  });

  refreshMutation.finished.success.watch(({ result }) => {
    if (result?.token) {
      retry(query, {
        times: 1,
        delay: '1s',
        filter: isHttpErrorCode(401),
      });
    }
  });

  sample({
    clock: query.finished.failure,
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

  return query;
}
