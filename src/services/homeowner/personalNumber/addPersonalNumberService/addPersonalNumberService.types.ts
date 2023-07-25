import { HomeownerAccountCreateRequest } from 'api/types';

export type AddHomeownerRequestPayload = {
  body: HomeownerAccountCreateRequest;
  isForced?: boolean;
};
