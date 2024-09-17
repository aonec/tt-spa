import {
  AddNodeRequest,
  NodeResponse,
  NodeSearchResponse,
  StatusResponse,
} from 'api/mvitu.types';
import { SearchNodeParams } from '../addNodeToIntegrationService.types';

export type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSearchNodes: (payload: SearchNodeParams) => void;
  nodesSearchList: NodeSearchResponse | null;
  isNodesSearchLoading: boolean;
  handleSelectNode: (payload: number) => void;
  selectedNode: NodeResponse | null;
  isSelectedNodeLoading: boolean;
  handleAddNodeToIntegration: (payload: AddNodeRequest) => void;
  isAddNodeLoading: boolean;
  integrationData: StatusResponse | null;
};
