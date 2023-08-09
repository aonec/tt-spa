import { Contract, createJsonMutation } from '@farfetched/core';
import { combine, createStore } from 'effector';
import { RefreshResponseSuccessApiResponse } from 'api/types';
import { tokensService } from './tokensService.model';

const RefreshContract: Contract<unknown, RefreshResponseSuccessApiResponse> = {
  isData: (res): res is RefreshResponseSuccessApiResponse => Boolean(res),
  getErrorMessages: () => ['Invalid data'],
};

export const refreshMutation = createJsonMutation({
  request: {
    method: 'POST',
    url: {
      source: createStore('https://fop.k8s.transparent-technology.ru/api/'),
      fn: (_, baseUrl) => new URL('auth/refreshToken', baseUrl).toString(),
    },
    body: {
      source: combine(
        tokensService.outputs.$refreshToken,
        tokensService.outputs.$token,
      ),
      fn: (_, [refreshToken, token]) => ({ refreshToken, token }),
    },
  },
  response: {
    contract: RefreshContract,
    mapData: ({ result }) => result.successResponse,
  },
});
