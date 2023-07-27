import { sample } from 'effector';
import { refreshMutation } from './tokensService.api';
import { tokensService } from './tokensService.model';
import { isHttpErrorCode } from '@farfetched/core';

sample({
  clock: refreshMutation.finished.success,
  fn: ({ result }) => result.token,
  target: tokensService.inputs.setToken,
});

sample({
  clock: refreshMutation.finished.success,
  fn: ({ result }) => result.refreshToken,
  target: tokensService.inputs.setRefreshToken,
});

sample({
  clock: refreshMutation.finished.failure,
  filter: isHttpErrorCode(401),
  target: [
    tokensService.inputs.deleteToken,
    tokensService.inputs.deleteRefreshToken,
  ],
});
