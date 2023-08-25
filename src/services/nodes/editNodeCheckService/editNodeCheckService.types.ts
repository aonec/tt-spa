import { NodeCheckResponse, UpdateNodeCheckRequest } from 'api/types';

export type UpdateNodeCheckPayload = {
  nodeId: number;
  checkId: number;
} & UpdateNodeCheckRequest;

export type NodeCheckInfo = {
  nodeId: number;
} & NodeCheckResponse;
