import { EOrderByRule } from 'myApi';

export interface GetNodeChecksRequest {
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}
