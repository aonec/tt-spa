import { axios } from '01/axios';
import { HouseManagementWithStreetsResponse } from 'myApi';

export const getAddressesWithHouseManagements = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement'
  );
