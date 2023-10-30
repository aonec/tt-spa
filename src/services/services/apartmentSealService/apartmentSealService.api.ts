import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  IndividualDeviceListItemResponsePagedList,
  AppointmentResponse,
  DistrictResponse,
} from 'api/types';

export const getIndividualDevices = (
  ApartmentId?: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { ApartmentId } });

export const getNearestAppointmentForApartment = (
  ApartmentId: number,
): Promise<AppointmentResponse[]> =>
  axios.get('IndividualSeal/Appointments', { params: { ApartmentId } });

export const existingDistrictsQuery = createQuery<
  void,
  DistrictResponse[] | null
>({
  handler: async () => {
    const districts: DistrictResponse[] = await axios.get(
      'IndividualSeal/Districts',
    );

    if (!districts) return null;

    return districts.reverse();
  },
});
