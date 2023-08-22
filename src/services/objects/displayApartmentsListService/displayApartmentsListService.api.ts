import { axios } from 'api/axios';
import { ApartmentListResponsePagedList } from 'api/types';
import { GetApartmentsListRequestPayload } from './displayApartmentsListService.types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';

export const getApartmentsQuery = createQuery({
  effect: createEffect<
    GetApartmentsListRequestPayload,
    ApartmentListResponsePagedList
  >(async (params) => await axios.get('Apartments', { params })),
});
