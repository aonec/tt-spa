import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { GetIndividualDevicesToClose } from 'api/types';

export const getAllClosingDevicesQuery = createQuery<
  [],
  GetIndividualDevicesToClose
>({
  handler: () => axios.get(`/IndividualDevices/getAllClosing`),
});
