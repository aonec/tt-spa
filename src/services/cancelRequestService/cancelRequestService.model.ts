import { createDomain } from 'effector';
import { SetTokenPayload, TokensByUrl } from './cancelRequestService.types';
import _ from 'lodash';

const domain = createDomain('cancelRequestService');

const cancelRequest = domain.createEvent<string>();

const setToken = domain.createEvent<SetTokenPayload>();
const $tokens = domain
  .createStore<TokensByUrl>({})
  .on(setToken, (tokens, { token, url }) => ({ ...tokens, [url]: token }))
  .on(cancelRequest, (tokens, url) => {
    const token = tokens[url];
    if (!token) {
      return tokens;
    }
    token.cancel();
    return _.omit(tokens, url);
  });

export const cancelRequestService = {
  inputs: {
    cancelRequest,
    setToken,
  },
  outputs: {
    $tokens,
  },
};
