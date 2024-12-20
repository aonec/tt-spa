import { axios } from 'api/axios';
import queryString from 'query-string';
import {
  EMeteringDeviceType,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceResponse,
} from 'api/types';
import { GetMeteringDevicesModelsRequest } from './displayIndividualDeviceAndNamesService.types';

export const getIndividualDevice = async (
  id: number,
): Promise<IndividualDeviceResponse> => {
  if (!id) throw new Error('no id');

  const res: IndividualDeviceResponse = await axios.get(
    `IndividualDevices/${id}`,
  );

  return res;
};

export const getIndividualDevicesModels = async (
  data: GetMeteringDevicesModelsRequest,
): Promise<string[]> => {
  const params = {
    Type: EMeteringDeviceType.Individual,
    PageSize: 10,
    ...data,
  };

  const path = `MeteringDevices/ExistingModels/`;

  const res: { items: string[] } = await axios.get(path, {
    params,
    paramsSerializer: (params) => queryString.stringify(params),
  });

  return res.items;
};

export const getSerialNumberForCheck = (
  serialNumber: string,
): Promise<IndividualDeviceListResponseFromDevicePagePagedList> =>
  axios.get('devices/individual', {
    params: {
      serialNumber,
    },
  });
