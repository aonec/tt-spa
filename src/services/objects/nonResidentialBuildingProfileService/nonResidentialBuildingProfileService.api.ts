import { axios } from 'api/axios';
import { createQuery } from '@farfetched/core';
import { EResourceDisconnectingStatus, NonResidentialBuildingResponse, ResourceDisconnectingResponsePagedList } from 'api/types';

export const nonResidentialBuildingQuery = createQuery<
  number,
  NonResidentialBuildingResponse
>({
  handler: (id) => axios.get(`NonResidentialBuildings/${id}`),
});

export const resourceDisconnectionQuery = createQuery<
  number,
  ResourceDisconnectingResponsePagedList
>({
  handler: (BuildingId) =>
    axios.get('ResourceDisconnecting', {
      params: { BuildingId, Status: EResourceDisconnectingStatus.Active },
    }),
});
