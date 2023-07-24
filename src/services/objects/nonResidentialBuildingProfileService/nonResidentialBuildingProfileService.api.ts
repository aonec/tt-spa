import { axios } from 'api/axios';
import { createQuery } from '@farfetched/core';
import { NonResidentialBuildingResponse } from 'api/types';

export const nonResidentialBuildingQuery = createQuery<
  number,
  NonResidentialBuildingResponse
>({
  handler: (id) => axios.get(`NonResidentialBuildings/${id}`),
});
