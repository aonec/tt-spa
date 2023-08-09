import { createDomain } from 'effector';
import { persist } from 'effector-storage/local';

const domain = createDomain('tokensService');

const deleteToken = domain.createEvent();
const setToken = domain.createEvent<string>();
const $token = domain
  .createStore<string | null>(null)
  .on(setToken, (_, token) => token)
  .reset(deleteToken);
persist({ store: $token, key: 'token' });

const deleteRefreshToken = domain.createEvent();
const setRefreshToken = domain.createEvent<string>();
const $refreshToken = domain
  .createStore<string | null>(null)
  .on(setRefreshToken, (_, token) => token)
  .reset(deleteRefreshToken);
persist({ store: $refreshToken, key: 'refreshToken' });

const redirectToLogin = domain.createEvent();
redirectToLogin.watch(() => window.location.replace('/login'));

export const tokensService = {
  inputs: {
    setToken,
    setRefreshToken,
    deleteToken,
    deleteRefreshToken,
    redirectToLogin,
  },
  outputs: {
    $token,
    $refreshToken,
  },
};
