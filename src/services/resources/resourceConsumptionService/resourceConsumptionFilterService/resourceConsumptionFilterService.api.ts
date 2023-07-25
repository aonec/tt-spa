import { axios } from 'api/axios';
import { HouseManagementWithStreetsResponse } from 'api/types';

export const fetchAddresses = (
  City: string,
): Promise<HouseManagementWithStreetsResponse[]> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement', {
    params: {
      City,
    },
  });
