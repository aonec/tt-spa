import {
  CalculatorListResponsePagedList,
  EMeteringDeviceType,
  EOrderByRule,
  HousingByFilterResponse,
} from 'api/types';
import { axios } from 'api/axios';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import queryString from 'query-string';
import { GetMeteringDevicesModelsRequest } from '../individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.types';

export const getCalculatorsList = (
  params: CalculatorsListRequestPayload,
): Promise<CalculatorListResponsePagedList> =>
  axios.get(`Calculators`, {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
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

export const getHousingMeteringDevicesModels = async (
  data: GetMeteringDevicesModelsRequest,
): Promise<string[]> => {
  const params = {
    Type: EMeteringDeviceType.HousingPipe,
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
