import { TotalAppointmentCounterResponse } from 'myApi';

export type SealProfileProps = {
  isNearestTotalAppointmentsLoading: boolean;
  nearestTotalAppointments: TotalAppointmentCounterResponse | null;
};
