import { axios } from '01/axios';

export const deleteApartmentAct = (actId: number): Promise<void> =>
  axios.delete(`ApartmentActs/${actId}`);
