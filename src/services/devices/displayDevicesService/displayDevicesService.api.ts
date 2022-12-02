import {
  CalculatorListResponsePagedList,
  HousingByFilterResponse,
} from './../../../myApi';
import { axios } from '01/axios';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { GetHousingByFilterRequestPayload } from '../devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesViewByAddressService/individualDevicesViewByAddressService.types';

export const getCalculatorsList = (
  params: CalculatorsListRequestPayload
): Promise<CalculatorListResponsePagedList> =>
  axios.get(`Calculators`, {
    params,
  });

export const getHousingsByFilter = (
  housingsParams: GetHousingByFilterRequestPayload[]
): Promise<HousingByFilterResponse[]> =>
  Promise.all(housingsParams.map((params) => getHousingByFilter(params)));

const getHousingByFilter = (
  params: GetHousingByFilterRequestPayload
): Promise<HousingByFilterResponse> =>
  axios.get('Devices/Individual/House', { params });
