import { axios } from 'api/axios';
import {
  AppointmentCounterResponse,
  AppointmentCreateRequest,
  AppointmentUpdateRequest,
  DistrictResponse,
} from 'api/types';
import { GetDistrictAppointmentsRequestPayload } from '../distributeRecordsService/distributeRecordsService.types';
import { createQuery } from '@farfetched/core';
import dayjs from 'dayjs';

export const fetchCreateSeal = (
  payload: AppointmentCreateRequest,
): Promise<void> => axios.post('IndividualSeal/Appointments', payload);

export const fetchEditAppointmentSeal = ({
  id,
  ...payload
}: AppointmentUpdateRequest & { id: string }): Promise<void> =>
  axios.put(`IndividualSeal/Appointments/${id}`, payload);

export const getDistrict = (HouseId: number): Promise<DistrictResponse[]> =>
  axios.get('IndividualSeal/Districts', { params: { HouseId } });

export const districtAppoinmtentsOnMonthQuery = createQuery<
  GetDistrictAppointmentsRequestPayload,
  {
    [key: string]: number;
  }
>({
  handler: async ({ date, districtId }) => {
    let startOfMonth = dayjs(date).startOf('month');
    const today = dayjs();

    if (startOfMonth.diff(today, 'day') < 0) {
      startOfMonth = today.startOf('day');
    }

    const res: AppointmentCounterResponse[] = await axios.get(
      'IndividualSeal/Appointments/Planning',
      {
        params: {
          districtId,
          from: startOfMonth.format('YYYY-MM-DD'),
          to: startOfMonth
            .add(1, 'month')
            .startOf('month')
            .format('YYYY-MM-DD'),
        },
      },
    );
    const preparedRes = res.reduce(
      (acc, day) => ({
        ...acc,
        [dayjs(day.date).format('YYYY-MM-DD')]:
          (day?.distributed || 0) + (day?.notDistributed || 0),
      }),
      {} as {
        [key: string]: number;
      },
    );

    return preparedRes;
  },
});
