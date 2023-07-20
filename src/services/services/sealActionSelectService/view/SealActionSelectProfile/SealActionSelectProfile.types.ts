import { TotalAppointmentCounterResponse } from 'api/myApi';

export type SealProfileProps = {
  isNearestTotalAppointmentsLoading: boolean;
  nearestTotalAppointments: TotalAppointmentCounterResponse | null;
};
