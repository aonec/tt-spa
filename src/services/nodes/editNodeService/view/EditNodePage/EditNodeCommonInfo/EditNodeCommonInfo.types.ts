import {
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'myApi';

export type EditNodeCommonInfoProps = {
  node: PipeNodeResponse;
  openAddNewZonesModal: () => void;
  nodeZones: NodeServiceZoneResponse[];
  formId: string;
  updateNode: (payload: UpdatePipeNodeRequest) => void;
  isLoading: boolean;
};
