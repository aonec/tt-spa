import { TotalAppointmentCounterResponse } from 'api/types';

export type SealProfileProps = {
  isNearestTotalAppointmentsLoading: boolean;
  nearestTotalAppointments: TotalAppointmentCounterResponse | null;
};
