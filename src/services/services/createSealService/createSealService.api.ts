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
import { createEvent, createStore, sample } from 'effector';

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

const clearAppointments = createEvent();
const addAppointment = createEvent<{ date: string; numberOfCounts: number }>();
export const $districtAppoinmtentsOnMonth = createStore<{
  [key: string]: number;
}>({})
  .on(addAppointment, (prevCounts, { date, numberOfCounts }) => ({
    ...prevCounts,
    [date]: numberOfCounts,
  }))
  .reset(clearAppointments);

export const districtAppoinmtentsOnMonthQuery = createQuery<
  GetDistrictAppointmentsRequestPayload,
  void
>({
  handler: async ({ date, districtId }) => {
    const startOfMonth = dayjs(date).startOf('month');
    const today = dayjs();

    await Promise.all(
      getFilledArray(startOfMonth.daysInMonth(), (index) => index).map(
        (shift) =>
          new Promise((resolve) => {
            const date = startOfMonth.add(shift, 'day');
            if (date.diff(today, 'day') < 0) {
              return resolve({ date, counting: null });
            }

            const formatedDate = date.format('YYYY-MM-DD');

            getDistrictAppoinmtentsCounting({
              date: formatedDate,
              districtId,
            }).then((counting) => resolve({ date: formatedDate, counting }));
          }).then((data) => {
            const { counting, date } = data as {
              date: string;
              counting: AppointmentCounterResponse | null;
            };

            addAppointment({
              date,
              numberOfCounts:
                (counting?.distributed || 0) + (counting?.notDistributed || 0),
            });
          }),
      ),
    );
  },
});

sample({
  clock: districtAppoinmtentsOnMonthQuery.start,
  target: clearAppointments,
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
