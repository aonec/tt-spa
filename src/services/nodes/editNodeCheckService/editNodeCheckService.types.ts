import { NodeCheckResponse, UpdateNodeCheckRequest } from 'api/myApi';

export type UpdateNodeCheckPayload = {
  nodeId: number;
  checkId: number;
} & UpdateNodeCheckRequest;

export type NodeCheckInfo = {
  nodeId: number;
} & NodeCheckResponse;
