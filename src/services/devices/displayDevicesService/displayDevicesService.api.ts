import {
  CalculatorListResponsePagedList,
  HousingByFilterResponse,
} from './../../../myApi';
import { axios } from '01/axios';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
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
