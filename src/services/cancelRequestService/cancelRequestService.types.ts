import { CancelTokenSource } from 'axios';

export type TokensByUrl = {
  [key: string]: CancelTokenSource;
};

export type SetTokenPayload = {
  url: string;
  token: CancelTokenSource;
};
