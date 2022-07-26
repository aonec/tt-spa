import { EOrderByRule } from '../../api/types';

export interface GetNodeChecksRequest {
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  NodeId: number;
}
