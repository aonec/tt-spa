import {
  ENodeCommercialAccountStatus,
  EPipeNodeConfig,
  NodeServiceZoneListResponse,
} from 'api/myApi';
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

export type NodeResourcesList = {
  configuration: EPipeNodeConfig;
  text: string;
}[];

export type NodeStatusesList = {
  nodeStatus: ENodeCommercialAccountStatus;
  text: string;
  Icon: FC;
}[];
