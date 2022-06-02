/* eslint-disable */

import { axios } from '01/axios';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import { CalculatorListResponsePagedList } from 'myApi';

export const devicesAPI = {
  async getDevices(
    pageNumber: number,
    pageSize: number,
    { searchTerm, expirationDate, destination, rule, diameterRange }: CalculatorsListRequestPayload
  ) {
    try {
      const extraQuery =
        (searchTerm ? `&Question=${searchTerm}` : '') +
        (expirationDate || expirationDate === 0
          ? `&Filter.ExpiresCheckingDateAt=${expirationDate}`
          : '') +
        (rule ? `&OrderBy=${destination}&OrderRule=${rule}` : '') +
        (diameterRange && !(diameterRange[0] === 0 && diameterRange[1] === 255)
          ? `&Filter.DiameterRange.From=${diameterRange[0]}&Filter.DiameterRange.To=${diameterRange[1]}`
          : '');
      const res = await axios.get(
        `Calculators/?pageNumber=${pageNumber}&pageSize=${pageSize}${extraQuery}`
      );
      return res;
    } catch (error) {}
  },
  async getDevicesBySerialNumber(serialNumber: any) {
    try {
      const res = await axios.get(
        `Calculators?Question=${serialNumber}&pageNumber=${1}&pageSize=${10}`
      );
      if (res.totalItems === 0) {
        return;
      }
      return res;
    } catch (error) {}
  },
};
const pagesize = 1
const pagenumber = 1
export const getCalculatorsList = (
  payload: CalculatorsListRequestPayload
): Promise<CalculatorListResponsePagedList> =>
  devicesAPI.getDevices(pagenumber, pagesize , payload);
