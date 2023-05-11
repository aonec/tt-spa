import { NodeCheckResponse, UpdateNodeCheckRequest } from 'myApi';

export type UpdateNodeCheckPayload = {
  nodeId: number;
  checkId: number;
} & UpdateNodeCheckRequest;

export type NodeCheckInfo = {
  nodeId: number;
} & NodeCheckResponse;
