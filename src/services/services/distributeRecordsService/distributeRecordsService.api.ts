import { axios } from '01/axios';
import { createMutation, createQuery } from '@farfetched/core';
import {
  AppointmentCounterResponse,
  AppointmentResponse,
  AppointmentsSetRequest,
  ControllerResponse,
  DistrictResponse,
  TotalAppointmentCounterResponse,
} from 'myApi';
import {
  AppointmentsCountingByDistrictsResponse,
  GetDistrictAppointmentsRequestPayload,
  GetDistrictsAppointmentsCountingRequestPayload,
} from './distributeRecordsService.types';

export const districtsQuery = createQuery<void, DistrictResponse[]>({
  handler: async () => {
    const districts: DistrictResponse[] = await axios.get(
      'IndividualSeal/Districts',
    );

    return districts;
  },
});

export const appointmentsCountingQuery = createQuery<
  GetDistrictsAppointmentsCountingRequestPayload,
  AppointmentsCountingByDistrictsResponse
>({
  handler: async ({ districtIds, date }) => {
    const districtsWithAppointmentsCounting = await Promise.all(
      districtIds.map(async (districtId) => {
        const appointmentsCounting: AppointmentCounterResponse =
          await axios.get('IndividualSeal/Appointments/Counting', {
            params: { districtId, date },
          });

        return { districtId, appointmentsCounting };
      }),
    );

    return districtsWithAppointmentsCounting.reduce((acc, elem) => {
      return { ...acc, [elem.districtId]: elem.appointmentsCounting };
    }, {});
  },
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

export const nearestAppointmentsDateQuery = createQuery<
  void,
  TotalAppointmentCounterResponse
>({ handler: () => axios.get('IndividualSeal/Appointments/Nearest') });

export const individualSealControllersQuery = createQuery<
  void,
  ControllerResponse[]
>({
  handler: () => axios.get('IndividualSeal/Controllers'),
});

export const setAppointmentsToControllerMutation = createMutation<
  AppointmentsSetRequest,
  void
>({ handler: (data) => axios.post('IndividualSeal/Appointments/Set', data) });
