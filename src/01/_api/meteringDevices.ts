import { EOrderByRule } from '../../api/types';
import axios from '../../api/axios';
import { EMeteringDeviceType } from '../../api/types';
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

  const path = `MeteringDevices/ExistingModels/${queryString}`;

  const res: { items: string[] } = await axios.get(path);

  return res.items;
};
