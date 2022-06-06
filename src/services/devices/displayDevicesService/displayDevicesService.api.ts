/* eslint-disable */

import { axios } from '01/axios';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import { CalculatorListResponsePagedList } from 'myApi';

export const devicesAPI:{getDevices:any} = {
  async getDevices(
    pageNumber: number,
    pageSize: number,
    params:any
  ) {
    try {
      // console.log(pageNumber,
      //   pageSize, Question, searchTerm)
      // const extraQuery =
      //   (Question ? `&Question=${Question}` : '') +
      //   (expirationDate || expirationDate === 0
      //     ? `&Filter.ExpiresCheckingDateAt=${expirationDate}`
      //     : '') +
      //   (rule ? `&OrderBy=${destination}&OrderRule=${rule}` : '') +
      //   (diameterRange && !(diameterRange[0] === 0 && diameterRange[1] === 255)
      //     ? `&Filter.DiameterRange.From=${diameterRange[0]}&Filter.DiameterRange.To=${diameterRange[1]}`
      //     : '');
        // (resource ? `&Filter.Resource=${resource}` : '') +
        // (model ? `&Filter.Model=${model}` : '') +
        // (rangeFrom ? `&Filter.CommercialDateRange.From=${rangeFrom}` : '') +
        // (rangeTo ? `&Filter.CommercialDateRange.To=${rangeTo}` : '');
        // + (rangeFrom? `&Filter.CommercialDateRange.From${rangeFrom}`:"" )
        const { Question, searchTerm } = params
        console.log(Question, 'a')
      const res = await axios.get(
        `Calculators/`, {params: {...params, pageNumber, pageSize}}
      );
      return res;
    } catch (error) {}
  },
  // async getDevicesBySerialNumber(serialNumber: any) {
  //   try {
  //     const res = await axios.get(
  //       `Calculators?Question=${serialNumber}&pageNumber=${1}&pageSize=${10}`
  //     );
  //     if (res.totalItems === 0) {
  //       return;
  //     }
  //     return res;
  //   } catch (error) {}
  // },
};
const pagesize = 1;
const pagenumber = 1;
export const getCalculatorsList = (
  payload: CalculatorsListRequestPayload
): Promise<CalculatorListResponsePagedList> =>
  devicesAPI.getDevices(pagesize,pagenumber, { params: payload });
