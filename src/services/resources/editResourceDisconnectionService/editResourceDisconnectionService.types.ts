import { ResourceDisconnectingUpdateRequest } from 'myApi';

export type ResourceDisconnectingUpdatePayload = {
  payload: ResourceDisconnectingUpdateRequest;
} & {
  id: string;
};

export type UpdateDocumentPayload = {
  id: string;
  documentId: number;
};
