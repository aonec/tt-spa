import {
  CalculatorListResponsePagedList,
  HousingByFilterResponse,
} from 'api/types';
import { axios } from 'api/axios';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import queryString from 'query-string';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';

export const getCalculatorsListQuery = createQuery({
  effect: createEffect<
    CalculatorsListRequestPayload,
    CalculatorListResponsePagedList
  >(
    async (params) =>
      await axios.get(`Calculators`, {
        params,
        paramsSerializer: (params) => {
          return queryString.stringify(params);
        },
      }),
  ),
});

export const getHousingsByFilter = async (
  housingsParams: GetHousingByFilterRequestPayload[],
): Promise<(HousingByFilterResponse | null)[]> =>
  Promise.all(housingsParams.map((params) => getHousingByFilter(params)));

const getHousingByFilter = async (
  params: GetHousingByFilterRequestPayload,
): Promise<HousingByFilterResponse | null> => {
  try {
    const res: HousingByFilterResponse = await axios.get(
      'Devices/Individual/House',
      { params },
    );
    return res;
  } catch {
    return null;
  }
};
