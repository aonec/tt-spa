import { Contract, createJsonMutation } from '@farfetched/core';
import { combine } from 'effector';
import { tokensService } from './tokensService.model';
import { currentOrganizationService } from 'services/currentOrganizationService';
import { RefreshResponse } from 'api/types';

const RefreshContract: Contract<unknown, RefreshResponse> = {
  isData: (res): res is RefreshResponse => Boolean(res),
  getErrorMessages: () => ['Invalid data'],
};

export const refreshMutation = createJsonMutation({
  request: {
    method: 'POST',
    url: {
      source: currentOrganizationService.outputs.$devUrl,
      fn: (_, baseUrl) => new URL('Auth/refreshToken', baseUrl).toString(),
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
    mapData: ({ result }) => result,
  },
});
