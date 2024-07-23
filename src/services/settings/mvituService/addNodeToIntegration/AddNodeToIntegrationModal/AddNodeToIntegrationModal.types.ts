import { NodeSearchResponse } from 'api/mvitu.types';
import { SearchNodeParams } from '../addNodeToIntegrationService.types';

export type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSearchNodes: (payload: SearchNodeParams) => void;
  nodesSearchList: NodeSearchResponse | null;
  isNodesSearchLoading: boolean;
};
