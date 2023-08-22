import { axios } from 'api/axios';
import {
  ApartmentListResponsePagedList,
  ApartmentResponse,
  HomeownerAccountResponse,
} from 'api/types';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
  UpdateHomeownerRequestPayload,
} from './ApartmentReadingsService.types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

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

export const putApartment = ({
  apartmentId,
  ...data
}: UpdateApartmentRequestPayload): Promise<ApartmentResponse> =>
  axios.put(`Apartments/${apartmentId}`, data);

export const patchHomeowner = ({
  id,
  data,
}: UpdateHomeownerRequestPayload): Promise<HomeownerAccountResponse> =>
  axios.put(`HomeownerAccounts/${id}`, data);
