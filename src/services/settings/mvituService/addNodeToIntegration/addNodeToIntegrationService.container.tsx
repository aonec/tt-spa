import { useUnit } from 'effector-react';
import { AddNodeToIntegrationModal } from './AddNodeToIntegrationModal';
import { addNodeToIntegrationService } from './addNodeToIntegrationService.models';
import {
  getNodeQuery,
  searchNodesQuery,
} from './addNodeToIntegrationService.api';

const { inputs, outputs } = addNodeToIntegrationService;

export const AddNodeToIntegrationContainer = () => {
  const {
    isModalOpen,
    handleCloseModal,
    handleSearchNodes,
    nodesSearchList,
    isNodesSearchLoading,
    handleSelectNode,
    selectedNode,
    isSelectedNodeLoading,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleSearchNodes: searchNodesQuery.start,
    nodesSearchList: searchNodesQuery.$data,
    isNodesSearchLoading: searchNodesQuery.$pending,
    selectedNode: getNodeQuery.$data,
    handleSelectNode: getNodeQuery.start,
    isSelectedNodeLoading: getNodeQuery.$pending,
  });

  return (
    <AddNodeToIntegrationModal
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleSearchNodes={handleSearchNodes}
      nodesSearchList={nodesSearchList}
      isNodesSearchLoading={isNodesSearchLoading}
      handleSelectNode={handleSelectNode}
      selectedNode={selectedNode}
      isSelectedNodeLoading={isSelectedNodeLoading}
    />
  );
};
