import { createEvent, createStore } from 'effector';
import { SetTokenPayload, TokensByUrl } from './cancelRequestService.types';
import _ from 'lodash';

const cancelRequest = createEvent<string>();

const setToken = createEvent<SetTokenPayload>();
const $tokens = createStore<TokensByUrl>({})
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
