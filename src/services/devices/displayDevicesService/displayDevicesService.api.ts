import { BuildingByFilterResponse, NodesPagedList } from 'api/types';
import { axios } from 'api/axios';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import queryString from 'query-string';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import { NodesListRequestPayload } from './displayDevicesService.types';

export const getNodesListQuery = createQuery({
  effect: createEffect<NodesListRequestPayload, NodesPagedList>(
    async (params) =>
      await axios.get('Nodes', {
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
