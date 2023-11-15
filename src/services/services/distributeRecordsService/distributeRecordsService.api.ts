import { axios } from 'api/axios';
import { createMutation, createQuery } from '@farfetched/core';
import {
  AppointmentCounterResponse,
  AppointmentResponse,
  AppointmentsSetRequest,
  ControllerResponse,
  DistrictResponse,
  TotalAppointmentCounterResponse,
} from 'api/types';
import {
  AppointmentsCountingByDistrictsResponse,
  GetDistrictAppointmentsRequestPayload,
  GetDistrictsAppointmentsCountingRequestPayload,
} from './distributeRecordsService.types';
import { EffectFailDataAxiosError } from 'types';
import { createEffect } from 'effector';
import dayjs from 'api/dayjs';
import { getFilledArray } from 'utils/getFilledArray';

export const districtsQuery = createQuery<void, DistrictResponse[] | null>({
  handler: async () => {
    const districts: DistrictResponse[] = await axios.get(
      'IndividualSeal/Districts',
    );

    if (!districts) return null;

    return districts.reverse();
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

export const districtAppoinmtentsOnMonthQuery = createQuery<
  GetDistrictAppointmentsRequestPayload,
  { [key: string]: number }
>({
  handler: async ({ date, districtId }) => {
    const startOfMonth = dayjs(date).startOf('month');
    const result = await Promise.all(
      getFilledArray(dayjs(date).daysInMonth(), (index) => index).map(
        async (shift) => {
          const date = startOfMonth.add(shift, 'day').format('YYYY-MM-DD');
          const counting = await getDistrictAppoinmtentsCounting({
            date,
            districtId,
          });

          return {
            date,
            numberOfCounts:
              (counting?.distributed || 0) + (counting?.notDistributed || 0),
          };
        },
      ),
    );

    return result.reduce((acc, { date, numberOfCounts }) => {
      if (numberOfCounts) {
        return { ...acc, [date]: numberOfCounts };
      }
      return acc;
    }, {} as { [key: string]: number });
  },
});

const getDistrictAppoinmtentsCounting = async (
  params: GetDistrictAppointmentsRequestPayload,
) => {
  try {
    const response: AppointmentCounterResponse = await axios.get(
      'IndividualSeal/Appointments/Counting',
      { params },
    );

    return response;
  } catch {
    return null;
  }
};

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

export const setAppointmentsToControllerMutation = createMutation({
  effect: createEffect<AppointmentsSetRequest, void, EffectFailDataAxiosError>(
    (data) => axios.post('IndividualSeal/Appointments/Set', data),
  ),
});

export const individualSealTaskDocumentQuery = createQuery<
  {
    controllerId: string;
    appointmentDate: string;
  },
  string
>({
  handler: ({ controllerId, appointmentDate }) => {
    return axios.get(`IndividualSeal/Controllers/${controllerId}/WorkFile`, {
      params: { date: dayjs(appointmentDate).format('YYYY-MM-DD') },
      responseType: 'blob',
    });
  },
});
