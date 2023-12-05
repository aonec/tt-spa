import { sample } from 'effector';
import { refreshMutation } from './tokensService.api';
import { tokensService } from './tokensService.model';
import { createBarrier, isHttpErrorCode } from '@farfetched/core';

sample({
  clock: refreshMutation.finished.success.map(({ result }) => result?.token),
  filter: Boolean,
  target: tokensService.inputs.setToken,
});

sample({
  clock: refreshMutation.finished.success.map(
    ({ result }) => result?.refreshToken,
  ),
  filter: Boolean,
  target: [
    tokensService.inputs.tokenActive,
    tokensService.inputs.setRefreshToken,
  ],
});

sample({
  clock: refreshMutation.finished.failure,
  filter: isHttpErrorCode(401),
  target: [
    tokensService.inputs.deleteToken,
    tokensService.inputs.deleteRefreshToken,
    tokensService.inputs.tokenActive,
    tokensService.inputs.redirectToLogin,
  ],
});

export const authBarrier = createBarrier({
  active: tokensService.outputs.$isActive,
  perform: [refreshMutation],
});
