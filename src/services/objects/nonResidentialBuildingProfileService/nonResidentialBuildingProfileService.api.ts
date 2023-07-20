import { axios } from 'api/axios';
import { createQuery } from '@farfetched/core';
import { NonResidentialBuildingResponse } from 'api/myApi';

export const getNonResidentialBuildingQuery = createQuery<
  number,
  NonResidentialBuildingResponse
>({
  handler: (id) => axios.get(`NonResidentialBuildings/${id}`),
});
