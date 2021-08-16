import { EOrderByRule } from './../../myApi';
import axios from '01/axios';
import { EMeteringDeviceType } from 'myApi';
import { formQueryString } from '01/utils/formQueryString';

export interface GetMeteringDevicesModelsRequest {
  Type?: EMeteringDeviceType;
  Text?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export const getIndividualDevicesModels = async (
  data: GetMeteringDevicesModelsRequest
): Promise<string[]> => {
  const queryString = formQueryString({
    Type: EMeteringDeviceType.Individual,
    PageSize: 10,
    ...data,
  });

  const res: { items: string[] } = await axios.get(
    `​MeteringDevices​/ExistingModels${queryString}`
  );

  return res.items;
};
