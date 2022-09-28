import { axios } from '01/axios';
import { ResourceDisconnectingResponse } from 'myApi';
import { ResourceDisconnectingUpdatePayload } from './editResourceDisconnectionService.types';

export const fetchResourceDisconnection = (
  id: string
): Promise<ResourceDisconnectingResponse> =>
  axios.get(`ResourceDisconnecting/${id}`);

export const fetchEditResourceDisconnection = ({
  id,
  payload,
}: ResourceDisconnectingUpdatePayload): Promise<void> =>
  axios.post(`ResourceDisconnecting/${id}`, payload);
