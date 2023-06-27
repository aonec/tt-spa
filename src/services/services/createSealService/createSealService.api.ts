import { axios } from '01/axios';
import { AppointmentCreateRequest } from 'myApi';

export const fetchCreateSeal = (
  payload: AppointmentCreateRequest,
): Promise<void> => axios.post('IndividualSeal/Appointments', payload);
