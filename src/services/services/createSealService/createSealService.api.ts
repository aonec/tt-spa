import { axios } from 'api/axios';
import {
  AppointmentCounterResponse,
  AppointmentCreateRequest,
  AppointmentUpdateRequest,
  DistrictResponse,
} from 'api/types';
import { GetDistrictAppointmentsRequestPayload } from '../distributeRecordsService/distributeRecordsService.types';
import { createQuery } from '@farfetched/core';
import { getFilledArray } from 'utils/getFilledArray';
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
