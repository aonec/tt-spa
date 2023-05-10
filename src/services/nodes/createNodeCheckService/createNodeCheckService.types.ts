import { CreateNodeCheckRequest } from 'myApi';

export type CreateNodeCheckPayload = {
  nodeId: number;
} & CreateNodeCheckRequest;
