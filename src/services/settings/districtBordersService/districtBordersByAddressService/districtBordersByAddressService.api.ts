import { axios } from '01/axios';
import {
  HousingStockListResponsePagedList,
  StreetWithBuildingNumbersResponsePagedList,
} from 'myApi';
import { FetchAddressQueryType } from './districtBordersByAddressService.types';

export const getAddresses = (
  params: FetchAddressQueryType,
): Promise<StreetWithBuildingNumbersResponsePagedList> => {
  return axios.get('HousingStocks/ExistingStreetsWithHousingStockNumbers', {
    params,
  });
};

export const getHousingStocksWithCoordinates = (params: {
  City?: string;
}): Promise<HousingStockListResponsePagedList> =>
  axios.get('HousingStocks', { params });
