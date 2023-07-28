import { HomeownerAccountUpdateRequest } from 'api/types';

export type EditHomeownerRequestPayload = {
  id: string;
  isForced?: Boolean;
  data: HomeownerAccountUpdateRequest;
};
