import {
  ENodeCommercialAccountStatus,
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'myApi';

export type EditNodeCommonInfoProps = {
  node: PipeNodeResponse;
  openAddNewZonesModal: () => void;
  nodeZones: NodeServiceZoneResponse[];
  formId: string;
};

export type UpdatePipeNodeFormik = Omit<UpdatePipeNodeRequest, 'number'> & {
  number?: string;
  nodeStatus?: ENodeCommercialAccountStatus;
  futureCommercialAccountingDate: string;
  lastCommercialAccountingDate: string;
};
