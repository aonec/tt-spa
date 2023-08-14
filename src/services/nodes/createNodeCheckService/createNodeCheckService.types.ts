import { CreateNodeCheckRequest } from 'api/types';

export type CreateNodeCheckPayload = {
  nodeId: number;
} & CreateNodeCheckRequest;
