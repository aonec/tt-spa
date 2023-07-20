import { NodeSetRegistrationTypeRequest } from 'api/myApi';

export type ChangeNodeTypePayload = NodeSetRegistrationTypeRequest & {
  nodeId: number;
};
