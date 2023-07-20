import { ResourceDisconnectingUpdateRequest } from 'api/types';

export type ResourceDisconnectingUpdatePayload = {
  payload: ResourceDisconnectingUpdateRequest;
} & {
  id: string;
};

export type UpdateDocumentPayload = {
  id: string;
  documentId: number;
};
