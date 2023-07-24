import { axios } from '01/axios';
import { createEffect } from 'effector';
import { HouseManagementWithStreetsResponse } from 'myApi';

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
