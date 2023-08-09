import { axios } from 'api/axios';
import {
  ApartmentListResponsePagedList,
  ApartmentListResponsePagedListSuccessApiResponse,
  ApartmentResponse,
  ApartmentResponseSuccessApiResponse,
  HomeownerAccountResponse,
  HomeownerAccountUpdateRequest,
} from 'api/types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from './ApartmentReadingsService.types';
import { Contract } from '@farfetched/core';
import { sample } from 'effector';
import { createQueryWithAuth } from 'api/createQueryWithAuth';

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
      return (result?.items || [])[0]?.id || 0;
    },
  },
  url: 'Apartments',
});

export const getApartmentQuery = createQueryWithAuth<
  { ApartmentId: number },
  ApartmentResponse,
  ApartmentResponse | null
>({
  url: ({ ApartmentId }) => `Apartments/${ApartmentId}`,
  response: {
    contract: ApartmentContract,
    mapData: ({ result }) => result,
  },
});

sample({
  clock: getApartmentIdQuery.finished.success.map(({ result }) => result),
  filter: Boolean,
  fn: (ApartmentId) => ({ ApartmentId }),
  target: getApartmentQuery.start,
});

sample({
  clock: getApartmentIdQuery.finished.success.map(({ result }) => result),
  filter: (result) => !Boolean(result),
  target: getApartmentQuery.reset,
});

export const putApartment = ({
  apartmentId,
  ...data
}: UpdateApartmentRequestPayload): Promise<ApartmentResponse> =>
  axios.put(`Apartments/${apartmentId}`, data);

export const patchHomeowner = ({
  id,
  data,
}: {
  id: string;
  data: HomeownerAccountUpdateRequest;
}): Promise<HomeownerAccountResponse> =>
  axios.put(`HomeownerAccounts/${id}`, data);
