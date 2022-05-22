import { axios } from '01/axios';

export const deleteDevice = (id: number): Promise<void> =>
  axios.post(`IndividualDevices/${id}/Delete`);
