import { EMeteringDeviceType, EOrderByRule } from 'api/types';

export interface GetMeteringDevicesModelsRequest {
  Type?: EMeteringDeviceType;
  Text?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}
