import { TotalAppointmentCounterResponse } from 'myApi-test';

export type SealProfileProps = {
  isNearestTotalAppointmentsLoading: boolean;
  nearestTotalAppointments: TotalAppointmentCounterResponse | null;
};
