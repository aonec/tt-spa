import { axios } from 'api/axios';
import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  ResourceDisconnectingCreateRequest,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';

export const fetchCreateResourceDisconnection = (
  payload: ResourceDisconnectingCreateRequest,
): Promise<void> => axios.post('ResourceDisconnecting', payload);

export const fetchExistingHousingStocks = (
  city: string,
): Promise<StreetWithBuildingNumbersResponsePagedList> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: { city },
  });

export const fetchExistingHousingStocksWithHouseManagement = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement');

export const fetchExistingHousingStocksWithHeatingStation = (): Promise<
  HeatingStationWithStreetsResponse[]
> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHeatingStation');
