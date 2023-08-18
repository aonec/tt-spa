import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { IndividualDeviceResponse } from 'api/types';

export const individualDeviceQuery = createQuery<
  number,
  IndividualDeviceResponse
>({
  handler: (id) => axios.get(`IndividualDevices/${id}`),
});
