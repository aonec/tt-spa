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
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleSearchNodes: searchNodesQuery.start,
    nodesSearchList: searchNodesQuery.$data,
    isNodesSearchLoading: searchNodesQuery.$pending,
    selectedNode: getNodeQuery.$data,
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
    />
  );
};
