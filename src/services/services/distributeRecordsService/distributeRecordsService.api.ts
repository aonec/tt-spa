import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import {
  AppointmentResponse,
  DistrictResponse,
  TotalAppointmentCounterResponse,
} from 'myApi';
import { GetDistrictAppointmentsRequestPayload } from './distributeRecordsService.types';

export const districtsQuery = createQuery<void, DistrictResponse[]>({
  handler: () => axios.get('IndividualSeal/Districts'),
});

export const districtAppointmentsQuery = createQuery<
  GetDistrictAppointmentsRequestPayload,
  AppointmentResponse[]
>({
  handler: (data) =>
    axios.get('IndividualSeal/Appointments', {
      params: {
        'DistrictFilter.DistrictId': data.districtId,
        'DistrictFilter.Date': data.date,
      },
    }),
});

export const getNearestAppointmentsDate = createQuery<
  void,
  TotalAppointmentCounterResponse
>({ handler: () => axios.get('IndividualSeal/Appointments/Nearest') });
