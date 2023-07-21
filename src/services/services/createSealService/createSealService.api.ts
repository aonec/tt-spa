import { axios } from 'api/axios';
import { AppointmentCreateRequest } from 'api/types';

export const fetchCreateSeal = (
  payload: AppointmentCreateRequest,
): Promise<void> => axios.post('IndividualSeal/Appointments', payload);
