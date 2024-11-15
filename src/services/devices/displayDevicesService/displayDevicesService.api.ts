import {
  BuildingByFilterResponse,
  NodesPagedList,
  EMeteringDeviceType,
  EOrderByRule,
  ENodeType,
} from 'api/types';
import { axios } from 'api/axios';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import queryString from 'query-string';
import { GetMeteringDevicesModelsRequest } from '../individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import { NodesListRequestPayload } from './displayDevicesService.types';

export const getNodesListQuery = createQuery({
  effect: createEffect<NodesListRequestPayload, NodesPagedList>(
    async (params) =>
      await axios.get('Nodes', {
        params,
        paramsSerializer: (params) => {
          return queryString.stringify({ ...params, Type: ENodeType.PipeNode });
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

export const getModels = async (
  data: GetMeteringDevicesModelsRequest,
): Promise<string[]> => {
  const params = {
    PageSize: 10,
    OrderBy: EOrderByRule.Descending,
    ...data,
  };

  const path = `MeteringDevices/ExistingModels`;

  const resODPU: { items: string[] } = await axios.get(path, {
    params: { ...params, Type: EMeteringDeviceType.HousingPipe },
  });

  const resCalculator: { items: string[] } = await axios.get(path, {
    params: { ...params, Type: EMeteringDeviceType.Calculator },
  });

  return [...resODPU.items, ...resCalculator.items];
};
