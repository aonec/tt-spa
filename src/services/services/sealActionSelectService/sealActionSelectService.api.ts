import { axios } from 'api/axios';
import { TotalAppointmentCounterResponse } from 'myApi';

export const getNearestTotalAppointments =
  (): Promise<TotalAppointmentCounterResponse> =>
    axios.get('IndividualSeal/Appointments/Nearest');
