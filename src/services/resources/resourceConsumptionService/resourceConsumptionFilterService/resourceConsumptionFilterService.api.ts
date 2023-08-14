import { axios } from 'api/axios';
import { createEffect } from 'effector';
import { HouseManagementWithStreetsResponse } from 'api/types';

export const fetchAddresses = (
  City: string,
): Promise<HouseManagementWithStreetsResponse[]> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement', {
    params: {
      City,
    },
  });

export const getAddressesFx = createEffect<
  string,
  HouseManagementWithStreetsResponse[]
>(fetchAddresses);
