import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  IndividualDeviceListItemResponsePagedList,
  AppointmentResponse,
  DistrictResponse,
  ApartmentResponse,
  ApartmentListResponsePagedList,
} from 'api/types';
import { createEffect } from 'effector';
import { GetApartmentsRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';
import { EffectFailDataAxiosError } from 'types';

export const getIndividualDevices = (
  ApartmentId?: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { ApartmentId } });

export const getNearestAppointmentForApartment = (
  ApartmentId: number,
): Promise<AppointmentResponse[]> =>
  axios.get('IndividualSeal/Appointments', { params: { ApartmentId } });

export const existingDistrictsQuery = createQuery<
  [],
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

const getApartmentId = async (
  params: Omit<GetApartmentsRequestPayload, 'ApartmentId'>,
) => {
  const apartments: ApartmentListResponsePagedList | null = await axios.get(
    'Apartments',
    { params: { ...params, PageSize: 1, PageNumber: 1 } },
  );

  const apartmentItem = apartments?.items?.[0];

  if (!apartmentItem) return null;

  const { id } = apartmentItem;

  return id;
};

export const getApartmentQuery = createQuery({
  effect: createEffect<
    GetApartmentsRequestPayload,
    ApartmentResponse | null,
    EffectFailDataAxiosError
  >(async ({ ApartmentId, ...params }) => {
    const id = ApartmentId || (await getApartmentId(params));

    if (!id) return null;

    const apartment: ApartmentResponse | null = await axios.get(
      `/Apartments/${id}`,
    );

    return apartment;
  }),
});
