import { axios } from '01/axios';
import { ResourceDisconnectingResponse } from 'myApi';
import { ResourceDisconnectingUpdatePayload, UpdateDocumentPayload } from './editResourceDisconnectionService.types';

export const fetchResourceDisconnection = (
  id: string
): Promise<ResourceDisconnectingResponse> =>
  axios.get(`ResourceDisconnecting/${id}`);

export const fetchEditResourceDisconnection = ({
  id,
  payload,
}: ResourceDisconnectingUpdatePayload): Promise<void> =>
  axios.post(`ResourceDisconnecting/${id}`, payload);

export const fetchUpdateResourceDisconnectingDocument = (payload:UpdateDocumentPayload): Promise<void> =>
  axios.post(`ResourceDisconnecting/${payload.id}/AddDocument`, {
    params: {
      documentId: payload.documentId,
    },
  });

export const fetchDeleteResourceDisconnectingDocument = (
  id: string
): Promise<void> => axios.post(`ResourceDisconnecting/${id}/DeleteDocument`);
