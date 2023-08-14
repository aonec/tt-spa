import { axios } from 'api/axios';

export const fetchCompleteResourceDisconnecting = (id: string): Promise<void> =>
  axios.post(`ResourceDisconnecting/${id}/Complete`);
