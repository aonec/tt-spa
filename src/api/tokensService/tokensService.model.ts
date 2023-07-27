import { createDomain } from 'effector';
import { persist } from 'effector-storage/local';

const domain = createDomain('tokensService');

const deleteToken = domain.createEvent();
const setToken = domain.createEvent();
const $token = domain
  .createStore<string>('')
  .on(setToken, (_, token) => token)
  .reset(deleteToken);
persist({ store: $token, key: 'token' });

const deleteRefreshToken = domain.createEvent();
const setRefreshToken = domain.createEvent();
const $refreshToken = domain
  .createStore<string>('')
  .on(setRefreshToken, (_, token) => token)
  .reset(deleteRefreshToken);
persist({ store: $refreshToken, key: 'refreshToken' });

const devUrl = 'https://stage.k8s.transparent-technology.ru/api/';
const $baseUrl = domain.createStore(process.env.REACT_APP_API_URL || devUrl);

const redirectToLogin = domain.createEvent();
redirectToLogin.watch(() => window.location.replace('/login'));

export const tokensService = {
  inputs: {
    setToken,
    setRefreshToken,
    deleteToken,
    deleteRefreshToken,
  },
  outputs: {
    $token,
    $refreshToken,
    $baseUrl,
  },
};
