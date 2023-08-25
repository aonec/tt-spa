import { axios } from 'api/axios';
import { AppointmentCreateRequest, AppointmentUpdateRequest } from 'api/types';

export const fetchCreateSeal = (
  payload: AppointmentCreateRequest,
): Promise<void> => axios.post('IndividualSeal/Appointments', payload);

export const fetchEditAppointmentSeal = ({
  id,
  ...payload
}: AppointmentUpdateRequest & { id: string }): Promise<void> =>
  axios.put(`IndividualSeal/Appointments/${id}`, payload);
