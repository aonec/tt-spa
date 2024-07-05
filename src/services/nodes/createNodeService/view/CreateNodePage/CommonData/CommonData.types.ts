import {
  ENodeCommercialAccountStatus,
  EPipeNodeConfig,
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
} from 'api/types';
import { Event } from 'effector';
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
  handleDeleteServiceZone: (payload: NodeServiceZoneResponse | null) => void;
  successDeleteServiceZone: Event<void>;
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
