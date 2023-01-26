import { NodeSetRegistrationTypeRequest } from 'myApi';

export type ChangeNodeTypePayload = NodeSetRegistrationTypeRequest & {
  nodeId: number;
};
