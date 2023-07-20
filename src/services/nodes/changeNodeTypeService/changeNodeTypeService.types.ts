import { NodeSetRegistrationTypeRequest } from 'api/types';

export type ChangeNodeTypePayload = NodeSetRegistrationTypeRequest & {
  nodeId: number;
};
