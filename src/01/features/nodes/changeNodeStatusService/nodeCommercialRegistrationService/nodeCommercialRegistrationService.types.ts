import {NodeSetRegisteredRequest, NodeSetNotRegisteredRequest } from 'myApi';

export type NodeCommercialRegistrationRequestPayload = {
  nodeId: number;
  data: NodeSetRegisteredRequest;
};

export type unsetNodeCommercialRegistrationRequestPayload = {
  nodeId: number;
  data: NodeSetNotRegisteredRequest;
};

// export type ElectricNodeCommercialRegistrationRequestPayload = {
//   electicNodeId: number;
//   data: NodeSetRegisteredRequest;
// };

// export type unsetElectricNodeCommercialRegistrationRequestPayload = {
//   electricNodeId: number;
//   data: NodeSetNotRegisteredRequest;
// };