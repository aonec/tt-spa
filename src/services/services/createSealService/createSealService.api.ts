import { axios } from 'api/axios';
import { AppointmentCreateRequest } from 'myApi';

export const fetchCreateSeal = (
  payload: AppointmentCreateRequest,
): Promise<void> => axios.post('IndividualSeal/Appointments', payload);
