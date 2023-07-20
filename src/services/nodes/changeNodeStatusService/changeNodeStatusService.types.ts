import {
  ENodeCommercialAccountStatus,
  NodeSetCommercialStatusRequest,
} from 'api/types';

export type ChangeNodeStatusPayload = NodeSetCommercialStatusRequest & {
  nodeId: number;
};

export type ChangeNodeStatusFormPayload = {
  commercialStatus: ENodeCommercialAccountStatus;
  documentId?: number | null;
  firstDate?: string;
  secondDate?: string;
};
