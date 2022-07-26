import { axios } from '../../api/axios';

export const deleteApartmentAct = (actId: number): Promise<void> =>
  axios.delete(`ApartmentActs/${actId}`);
