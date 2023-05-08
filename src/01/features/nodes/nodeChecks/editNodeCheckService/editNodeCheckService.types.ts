import { UpdateNodeCheckRequest } from 'myApi';

export type UpdateNodeCheckPayload = {
  nodeId: number;
  checkId: number;
} & UpdateNodeCheckRequest;
