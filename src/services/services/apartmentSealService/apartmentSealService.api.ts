import { Contract } from '@farfetched/core';
import { axios } from 'api/axios';
import { createQueryWithAuth } from 'api/createQueryWithAuth';
import {
  IndividualDeviceListItemResponsePagedList,
  AppointmentResponse,
  ApartmentListResponsePagedListSuccessApiResponse,
  ApartmentResponseSuccessApiResponse,
  ApartmentListResponsePagedList,
  ApartmentResponse,
} from 'api/types';
import { sample } from 'effector';
import { GetApartmentsRequestPayload } from 'services/meters/metersService/ApartmentReadingsService/ApartmentReadingsService.types';

export const getIndividualDevices = (
  ApartmentId?: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { ApartmentId } });

export const getNearestAppointmentForApartment = (
  ApartmentId: number,
): Promise<AppointmentResponse[]> =>
  axios.get('IndividualSeal/Appointments', { params: { ApartmentId } });

const ApartmentIdContract: Contract<
  unknown,
  ApartmentListResponsePagedListSuccessApiResponse
> = {
  isData: (res): res is ApartmentListResponsePagedListSuccessApiResponse =>
    Boolean(res),
  getErrorMessages: () => [`Invalid data`],
};

const ApartmentContract: Contract<
  unknown,
  ApartmentResponseSuccessApiResponse
> = {
  isData: (res): res is ApartmentResponseSuccessApiResponse => Boolean(res),
  getErrorMessages: () => [`Invalid data`],
};

export const getApartmentIdQuery = createQueryWithAuth<
  GetApartmentsRequestPayload,
  ApartmentListResponsePagedList,
  number | null
>({
  response: {
    contract: ApartmentIdContract,
    mapData: ({ result }) => {
      return (result?.items || [])[0]?.id || null;
    },
  },
  url: 'Apartments',
});

export const getApartmentQuery = createQueryWithAuth<
  { apartmentId: number },
  ApartmentResponse,
  ApartmentResponse | null
>({
  url: ({ apartmentId }) => `Apartments/${apartmentId}`,
  response: {
    contract: ApartmentContract,
    mapData: ({ result }) => result,
  },
});

sample({
  clock: getApartmentIdQuery.finished.success.map(({ result }) => result),
  filter: Boolean,
  fn: (apartmentId) => ({ apartmentId }),
  target: getApartmentQuery.start,
});
