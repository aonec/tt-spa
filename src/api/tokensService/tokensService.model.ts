import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

const deleteToken = createEvent();
const setToken = createEvent<string>();

const $token = createStore<string | null>(null)
  .on(setToken, (_, token) => token)
  .reset(deleteToken);

persist({ store: $token, key: 'token' });

const deleteRefreshToken = createEvent();
const setRefreshToken = createEvent<string>();

const $refreshToken = createStore<string | null>(null)
  .on(setRefreshToken, (_, token) => token)
  .reset(deleteRefreshToken);

persist({ store: $refreshToken, key: 'refreshToken' });

const redirectToLogin = createEvent();

redirectToLogin.watch(() => window.location.replace('/login'));

const tokenExpired = createEvent();
const tokenActive = createEvent();
const $isActive = createStore(false)
  .on(tokenExpired, () => true)
  .on(tokenActive, () => false);

const $isAuth = $token.map(Boolean);

export const tokensService = {
  inputs: {
    setToken,
    setRefreshToken,
    deleteToken,
    deleteRefreshToken,
    redirectToLogin,
    tokenActive,
    tokenExpired,
  },
  outputs: {
    $token,
    $refreshToken,
    $isActive,
    $isAuth,
  },
};
