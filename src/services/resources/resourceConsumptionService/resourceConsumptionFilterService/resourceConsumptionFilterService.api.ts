import { axios } from '01/axios';
import { HouseManagementWithStreetsResponse } from 'myApi';

export const fetchAddresses = (
  City: string,
): Promise<HouseManagementWithStreetsResponse[]> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement',
    {
      params: {
        City,
      },
    },
  );
