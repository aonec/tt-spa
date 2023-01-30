import { axios } from '01/axios';

export const fetchRemoveComment = (deviceId: number): Promise<void> =>
  axios.delete(`Calculators/${deviceId}/comment`);
