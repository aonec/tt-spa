import { NodeAdmissionActRequest } from 'myApi';

export type NodeCommercialRegistrationRequestPayload = {
  pipeNodeId: number;
  data: NodeAdmissionActRequest;
};

export type unsetNodeCommercialRegistrationRequestPayload = {
  pipeNodeId: number;
  data: NodeAdmissionActRequest; //здесь другой тип из кодгена
};