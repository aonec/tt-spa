import { Contract, createJsonMutation } from '@farfetched/core';
import { combine } from 'effector';
import { RefreshResponse } from 'api/types';
import { tokensService } from './tokensService.model';

const RefreshContract: Contract<unknown, RefreshResponse> = {
  isData: (res): res is RefreshResponse => Boolean(res),
  getErrorMessages: () => ['Invalid data'],
};

export const refreshMutation = createJsonMutation({
  request: {
    method: 'POST',
    url: {
      source: tokensService.outputs.$baseUrl,
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
  },
});
