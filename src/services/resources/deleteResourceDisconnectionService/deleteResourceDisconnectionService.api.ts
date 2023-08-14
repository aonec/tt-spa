import { axios } from 'api/axios';

export const fetchDeleteResourceDisconnecting = (id: string): Promise<void> =>
  axios.delete(`ResourceDisconnecting/${id}`);
