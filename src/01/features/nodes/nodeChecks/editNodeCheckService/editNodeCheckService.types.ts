import { UpdateNodeCheckRequest } from 'myApi';

export type UpdateNodeCheckPayload = {
  nodeId: number;
} & UpdateNodeCheckRequest;
