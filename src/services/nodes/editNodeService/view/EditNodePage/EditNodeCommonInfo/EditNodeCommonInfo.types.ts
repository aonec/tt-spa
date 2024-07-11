import {
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'api/types';
import { Event } from 'effector';

export type EditNodeCommonInfoProps = {
  node: PipeNodeResponse;
  openAddNewZonesModal: () => void;
  nodeZones: NodeServiceZoneResponse[];
  formId: string;
  updateNode: (payload: UpdatePipeNodeRequest) => void;
  isLoading: boolean;
  successDeleteServiceZone: Event<void>;
  handleDeleteServiceZone: (payload: NodeServiceZoneResponse | null) => void;
  handleFinallyDeleteServiceZone: (payload: number) => void;
  deletingServiceZone: NodeServiceZoneResponse | null;
  isDeleteServiceZoneDialogOpen: boolean;
  deletingServiceZoneCount: number | null;
};
