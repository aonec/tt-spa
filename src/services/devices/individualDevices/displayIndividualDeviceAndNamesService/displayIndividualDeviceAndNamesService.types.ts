import { EMeteringDeviceType, EOrderByRule } from 'myApi';

export interface GetMeteringDevicesModelsRequest {
  Type?: EMeteringDeviceType;
  Text?: string | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}
