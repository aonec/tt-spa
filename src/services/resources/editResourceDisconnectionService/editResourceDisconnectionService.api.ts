import { axios } from 'api/axios';
import { ResourceDisconnectingResponse } from 'api/myApi';
import {
  ResourceDisconnectingUpdatePayload,
  UpdateDocumentPayload,
} from './editResourceDisconnectionService.types';

export const fetchResourceDisconnection = (
  id: string,
): Promise<ResourceDisconnectingResponse> =>
  axios.get(`ResourceDisconnecting/${id}`);

export const fetchEditResourceDisconnection = ({
  id,
  payload,
}: ResourceDisconnectingUpdatePayload): Promise<void> =>
  axios.post(`ResourceDisconnecting/${id}`, payload);

export const fetchUpdateResourceDisconnectingDocument = (
  payload: UpdateDocumentPayload,
): Promise<void> =>
  axios.post(
    `ResourceDisconnecting/${payload.id}/AddDocument/${payload.documentId}`,
  );
