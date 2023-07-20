import { AppointmentCounterResponse } from 'api/types';

export type GetDistrictAppointmentsRequestPayload = {
  districtId: string;
  date: string;
};

export type AppointmentsCountingByDistrictsResponse = {
  [districtId: string]: AppointmentCounterResponse;
};

export type GetDistrictsAppointmentsCountingRequestPayload = {
  districtIds: string[];
  date: string;
};
