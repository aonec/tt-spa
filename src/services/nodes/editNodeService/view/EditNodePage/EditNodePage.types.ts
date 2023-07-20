import {
  CalculatorIntoHousingStockResponse,
  NodeServiceZoneResponse,
  PipeNodeResponse,
  UpdatePipeNodeRequest,
} from 'api/myApi';
import { NodeEditGrouptype } from '../../editNodeService.constants';

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
};
