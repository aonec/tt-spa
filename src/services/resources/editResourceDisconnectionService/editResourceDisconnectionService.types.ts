import { ResourceDisconnectingUpdateRequest } from 'myApi';

export type ResourceDisconnectingUpdatePayload = {
  payload: ResourceDisconnectingUpdateRequest;
} & {
  id: string;
};
