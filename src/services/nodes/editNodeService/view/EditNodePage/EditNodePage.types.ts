import {
  CalculatorIntoHousingStockResponse,
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'api/types';
import { NodeEditGrouptype } from '../../editNodeService.constants';
import { Event } from 'effector';

export type EditNodePageProps = {
  node: PipeNodeResponse;
  setGrouptype: (grouptype: NodeEditGrouptype) => void;
  grouptype: NodeEditGrouptype;
  openAddNewZonesModal: () => void;
  nodeZones: NodeServiceZoneResponse[];
  refetchNode: () => void;
  updateNode: (payload: UpdatePipeNodeRequest) => void;
  handleOpenCreateCalculatorModal: () => void;
  calculators: CalculatorIntoHousingStockResponse[];
  isUpdateLoading: boolean;
  openRemoveConnectionModal: (node: PipeNodeResponse) => void;
  successDeleteServiceZone: Event<void>;
  handleDeleteServiceZone: (payload: NodeServiceZoneResponse | null) => void;
  handleFinallyDeleteServiceZone: (payload: number) => void;
  deletingServiceZone: NodeServiceZoneResponse | null;
  isDeleteServiceZoneDialogOpen: boolean;
};
