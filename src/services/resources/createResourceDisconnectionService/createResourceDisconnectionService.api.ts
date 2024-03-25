import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  HousingStockResponse,
  ResourceDisconnectingCreateRequest,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';

export const fetchCreateResourceDisconnection = (
  payload: ResourceDisconnectingCreateRequest,
): Promise<void> => axios.post('ResourceDisconnecting', payload);

export const fetchExistingBuildings = (
  city: string,
): Promise<StreetWithBuildingNumbersResponsePagedList> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: { city },
  });

export const fetchExistingBuildingsWithHouseManagement = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement');

export const fetchExistingBuildingsWithHeatingStation = (): Promise<
  HeatingStationWithStreetsResponse[]
> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHeatingStation');

export const preselectedBuildingQuery = createQuery<
  number,
  HousingStockResponse
>({
  handler: (id) => axios.get(`Buildings/${id}`),
});
