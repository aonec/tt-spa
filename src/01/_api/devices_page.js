/* eslint-disable */

import axios from '../../api/axios';

export const devicesAPI = {
  async getDevices(
    pageNumber,
    pageSize,
    { searchTerm, expirationDate, destination, rule, diameterRange }
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
  async getDevicesBySerialNumber(serialNumber) {
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
