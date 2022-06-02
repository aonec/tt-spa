import { NodeSetRegisteredRequest, NodeSetNotRegisteredRequest } from 'myApi';

export type Error = {
  response: {
    data: {
      error: {
        Text: string;
      };
    };
  };
};

export type pipeType = 'pipe' | 'electric';

export type NodeCommercialRegistrationRequestPayload = {
  nodeId: number;
  data: NodeSetRegisteredRequest;
  type: pipeType;
};

export type unsetNodeCommercialRegistrationRequestPayload = {
  nodeId: number;
  data: NodeSetNotRegisteredRequest;
  type: pipeType;
};
