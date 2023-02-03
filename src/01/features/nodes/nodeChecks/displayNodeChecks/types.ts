import { EOrderByRule } from 'myApi';

export type Props = {
  pipeNodeId?: number;
};
export interface GetNodeChecksRequest {
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  NodeId: number;
}
