import { axios } from '01/axios';
import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  ResourceDisconnectingCreateRequest,
  StreetWithBuildingNumbersResponsePagedList,
} from 'myApi';

export const fetchCreateResourceDisconnection = (
  payload: ResourceDisconnectingCreateRequest,
): Promise<void> => axios.post('ResourceDisconnecting', payload);

export const fetchExistingHousingStocks = (
  city: string,
): Promise<StreetWithBuildingNumbersResponsePagedList> =>
  axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params: { city },
  });

export const fetchExistingHousingStocksWithHouseManagement = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement',
  );

export const fetchExistingHousingStocksWithHeatingStation = (): Promise<
  HeatingStationWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHeatingStation',
  );
