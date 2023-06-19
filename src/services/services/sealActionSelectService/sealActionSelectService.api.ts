import { axios } from '01/axios';
import { TotalAppointmentCounterResponse } from 'myApi-test';

export const getNearestTotalAppointments =
  (): Promise<TotalAppointmentCounterResponse> =>
    axios.get('IndividualSeal/Appointments/Nearest');
