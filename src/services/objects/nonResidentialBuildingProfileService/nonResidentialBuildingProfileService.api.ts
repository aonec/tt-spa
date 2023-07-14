import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { NonResidentialBuildingResponse } from 'myApi';

export const nonResidentialBuildingQuery = createQuery<
  number,
  NonResidentialBuildingResponse
>({
  handler: (id) => axios.get(`NonResidentialBuildings/${id}`),
});
