import { EOrderByRule } from './../../myApi';
import axios from '01/axios';
import queryString from 'query-string';
import { EMeteringDeviceType } from 'myApi';

export interface GetMeteringDevicesModelsRequest {
  Type?: EMeteringDeviceType;
  Text?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

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
    paramsSerializer: queryString.stringify,
  });

  return res.items;
};
