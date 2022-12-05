import {
  CreatePipeNodeRequest,
  ENodeCommercialAccountStatus,
  EResourceType,
  NodeServiceZoneListResponse,
} from 'myApi';
import { FC } from 'react';

export type CommonDataProps = {
  goPrevStep: () => void;
  nodeServiceZones: NodeServiceZoneListResponse | null;
  updateRequestPayload: (payload: CreatePipeNodeRequest) => void;
  openCreateNodeServiceZoneModal: () => void;
  requestPayload: CreatePipeNodeRequest;
};

export type NodeResourcesList = { resource: EResourceType; text: string }[];

export type NodeStatusesList = {
  nodeStatus: ENodeCommercialAccountStatus;
  text: string;
  Icon: FC;
}[];
