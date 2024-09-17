import { useUnit } from 'effector-react';
import { AddNodeToIntegrationModal } from './AddNodeToIntegrationModal';
import { addNodeToIntegrationService } from './addNodeToIntegrationService.models';
import {
  addNodeToIntegrationMutation,
  getNodeQuery,
  searchNodesQuery,
} from './addNodeToIntegrationService.api';
import { mvituIntegrationQuery } from '../mvituService.api';

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
    handleAddNodeToIntegration,
    isAddNodeLoading,
    integrationData,
    resetSelectedNode,
    resetNodesSearchingList,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleSearchNodes: searchNodesQuery.start,
    nodesSearchList: searchNodesQuery.$data,
    resetNodesSearchingList: searchNodesQuery.reset,
    isNodesSearchLoading: searchNodesQuery.$pending,
    selectedNode: getNodeQuery.$data,
    resetSelectedNode: getNodeQuery.reset,
    handleSelectNode: getNodeQuery.start,
    isSelectedNodeLoading: getNodeQuery.$pending,
    handleAddNodeToIntegration: addNodeToIntegrationMutation.start,
    isAddNodeLoading: addNodeToIntegrationMutation.$pending,
    integrationData: mvituIntegrationQuery.$data,
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
      handleAddNodeToIntegration={handleAddNodeToIntegration}
      isAddNodeLoading={isAddNodeLoading}
      integrationData={integrationData}
      resetSelectedNode={resetSelectedNode}
      resetNodesSearchingList={resetNodesSearchingList}
    />
  );
};
