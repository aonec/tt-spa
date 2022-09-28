import { axios } from '01/axios';

export const fetchDeleteResourceDisconnecting = (id: string): Promise<void> =>
  axios.delete(`ResourceDisconnecting/${id}`);
