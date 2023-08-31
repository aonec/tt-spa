import {
  BuildingByFilterResponse,
  CalculatorListResponsePagedList,
  EMeteringDeviceType,
  EOrderByRule,
} from 'api/types';
import { axios } from 'api/axios';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import queryString from 'query-string';
import { GetMeteringDevicesModelsRequest } from '../individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.types';
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
): Promise<(BuildingByFilterResponse | null)[]> =>
  Promise.all(housingsParams.map((params) => getHousingByFilter(params)));

const getHousingByFilter = async (
  params: GetHousingByFilterRequestPayload,
): Promise<BuildingByFilterResponse | null> => {
  try {
    const res: BuildingByFilterResponse = await axios.get(
      'Buildings/BuildingsByAddress',
      { params },
    );
    return res;
  } catch {
    return null;
  }
};

export const getCalculatorsModels = async (
  data: GetMeteringDevicesModelsRequest,
): Promise<string[]> => {
  const params = {
    Type: EMeteringDeviceType.Calculator,
    PageSize: 10,
    OrderBy: EOrderByRule.Descending,
    ...data,
  };

  const path = `MeteringDevices/ExistingModels/`;

  const res: { items: string[] } = await axios.get(path, {
    params,
  });

  return res.items;
};
