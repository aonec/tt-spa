import { axios } from '../../api/axios';

export const deleteDevice = (id: number): Promise<void> =>
  axios.post(`IndividualDevices/${id}/Delete`);
