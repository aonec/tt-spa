import { CreateNodeCheckRequest } from 'api/myApi';

export type CreateNodeCheckPayload = {
  nodeId: number;
} & CreateNodeCheckRequest;
