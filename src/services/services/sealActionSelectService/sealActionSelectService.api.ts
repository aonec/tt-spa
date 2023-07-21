import { axios } from 'api/axios';
import { TotalAppointmentCounterResponse } from 'api/types';

export const getNearestTotalAppointments =
  (): Promise<TotalAppointmentCounterResponse> =>
    axios.get('IndividualSeal/Appointments/Nearest');
