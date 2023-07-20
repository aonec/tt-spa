import { axios } from 'api/axios';
import { TotalAppointmentCounterResponse } from 'api/myApi';

export const getNearestTotalAppointments =
  (): Promise<TotalAppointmentCounterResponse> =>
    axios.get('IndividualSeal/Appointments/Nearest');
