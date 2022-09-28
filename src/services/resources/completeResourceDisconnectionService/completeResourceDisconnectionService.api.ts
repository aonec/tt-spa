import { axios } from '01/axios';

export const fetchCompleteResourceDisconnecting = (id: string): Promise<void> =>
  axios.post(`ResourceDisconnecting/${id}/Complete`);
