import {
  BuildingByFilterResponse,
  CalculatorListResponsePagedList,
} from 'api/types';
import { axios } from 'api/axios';
import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';
import queryString from 'query-string';

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
