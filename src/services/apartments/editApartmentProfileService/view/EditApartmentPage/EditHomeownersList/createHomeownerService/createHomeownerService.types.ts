import { HomeownerAccountCreateRequest } from 'api/types';

export type CreateHomeownerPayload = {
  body: HomeownerAccountCreateRequest;
  isForced: boolean;
};
