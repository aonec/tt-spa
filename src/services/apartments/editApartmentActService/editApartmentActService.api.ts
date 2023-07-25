import { axios } from 'api/axios';
import { EditActRequestPayload } from './editApartmentActService.types';

export const updateApartmentAct = ({
  act,
  actId,
}: EditActRequestPayload): Promise<void> =>
  axios.put(`ApartmentActs/${actId}`, act);

export const fetchDeleteActDocument = (id: number): Promise<void> =>
  axios.post(`ApartmentActs/${id}/DeleteDocument`);
