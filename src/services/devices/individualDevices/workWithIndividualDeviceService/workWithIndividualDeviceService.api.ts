import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { IndividualDeviceListResponseFromDevicePagePagedList } from 'myApi';

export const getSerialNumberQuery = createQuery<string, boolean>({
  handler: async (serialNumber) => {
    const res: IndividualDeviceListResponseFromDevicePagePagedList =
      await axios.get('devices/individual', {
        params: {
          serialNumber,
        },
      });

    return Boolean((res.items || []).length);
  },
});
