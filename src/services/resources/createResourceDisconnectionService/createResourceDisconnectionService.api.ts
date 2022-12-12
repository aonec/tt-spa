import { axios } from '01/axios';
import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  ResourceDisconnectingCreateRequest,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';

export const fetchCreateResourceDisconnection = (
  payload: ResourceDisconnectingCreateRequest
): Promise<void> => axios.post('ResourceDisconnecting', payload);

export const fetchExistingHousingStocks = (): Promise<StreetWithHousingStockNumbersResponsePagedList> =>
  axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers');

export const fetchExistingHousingStocksWithHouseManagement = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement'
  );

export const fetchExistingHousingStocksWithHeatingStation = (): Promise<
  HeatingStationWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHeatingStation'
  );
