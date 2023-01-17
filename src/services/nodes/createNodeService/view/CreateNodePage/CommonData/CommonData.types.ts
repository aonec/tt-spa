import {
  CreatePipeNodeRequest,
  ENodeCommercialAccountStatus,
  ENodeRegistrationType,
  EResourceType,
  NodeServiceZoneListResponse,
} from 'myApi';
import { FC } from 'react';
import {
  CreateNodeFormPayload,
  UpdateNodeFormPayloadCallback,
} from 'services/nodes/createNodeService/createNodeService.types';

export type CommonDataProps = {
  goPrevStep: () => void;
  nodeServiceZones: NodeServiceZoneListResponse | null;
  updateRequestPayload: UpdateNodeFormPayloadCallback;
  openCreateNodeServiceZoneModal: () => void;
  requestPayload: CreateNodeFormPayload;
};

export type NodeResourcesList = { resource: EResourceType; text: string }[];

export type NodeStatusesList = {
  nodeStatus: ENodeCommercialAccountStatus;
  text: string;
  Icon: FC;
}[];
